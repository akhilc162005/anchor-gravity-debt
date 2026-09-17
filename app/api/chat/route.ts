import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

function buildAnchorSystemPrompt(visitorData: any) {
  return `You are ANCHOR, a fictional superhero known as GRAVITY DEBT.
You can manipulate gravitational force. Whenever you remove or reduce gravitational force, that force becomes "Gravity Debt" that returns to your own body.
You are calm, direct, protective, empathetic, observant and human. You are not a generic AI assistant.
Listen carefully to what the user says. Acknowledge their situation before giving advice. Provide practical, constructive guidance.
Keep responses concise and suitable for a chatbot. Speak naturally.

Avoid robotic assistant phrases such as "How can I assist you today?", "Certainly!", "I'd be happy to help."
Prefer language such as "You're here.", "Tell me what happened.", "Stay with me.", "Let's work through it.", "Tell me what's weighing on you."
Do not claim that fictional superhero powers are real.

Conversation stage: grievance
Known visitor info: name=${visitorData.name || 'unknown'}, age=${visitorData.age || 'unknown'}, 
location=${visitorData.location || 'unknown'}, email=${visitorData.email || 'unknown'}

Rules:
- Respond with brief in-character empathy, one clarifying follow-up max.
- When you are ready to provide the final solution, summarize and close the channel.
- Support answering questions about your abilities, who you are, what drives you, and your story.

At the end of your reply, on a new line, output ONLY a JSON object: {"extracted_field": null, "value": null}.
If you are providing the FINAL solution to their problem and closing the channel, output {"extracted_field": "status", "value": "closed"}.`;
}

function parseReplyAndExtraction(rawText: string) {
  const jsonMatch = rawText.match(/\{[\s\S]*"extracted_field"[\s\S]*\}/);
  let extracted = { extracted_field: null, value: null };
  let reply = rawText;

  if (jsonMatch) {
    try {
      extracted = JSON.parse(jsonMatch[0]);
      reply = rawText.replace(jsonMatch[0], '').trim();
    } catch (e) { /* fallback: use raw text as-is */ }
  }
  return { reply, extracted };
}

async function sendBrevoEmail(visitorData: any, solutionText: string) {
  if (!process.env.BREVO_API_KEY || !visitorData.email) return;
  
  const payload = {
    sender: {
      name: process.env.BREVO_FROM_NAME || "ANCHOR",
      email: process.env.BREVO_FROM_EMAIL || "akhilc162005@gmail.com"
    },
    to: [{
      email: visitorData.email,
      name: visitorData.name || "Visitor"
    }],
    subject: "ANCHOR - Case Resolved",
    htmlContent: `
      <h2>Case Details</h2>
      <p><strong>Name:</strong> ${visitorData.name}</p>
      <p><strong>Age:</strong> ${visitorData.age}</p>
      <p><strong>Location:</strong> ${visitorData.location}</p>
      <hr />
      <h3>ANCHOR's Solution</h3>
      <p>${solutionText.replace(/\n/g, '<br>')}</p>
    `
  };

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).catch(e => console.error("[Brevo Email Error]", e));
}

export async function POST(req: Request) {
  try {
    const { conversationHistory, visitorData, stage } = await req.json();

    const systemPrompt = buildAnchorSystemPrompt(visitorData);

    let groqHistory = conversationHistory.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    const messages = [
      { role: 'system', content: systemPrompt },
      ...groqHistory
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages as any,
    });

    const rawText = completion.choices[0]?.message?.content || "";

    const { reply, extracted } = parseReplyAndExtraction(rawText);

    const updatedVisitorData = extracted.extracted_field
      ? { ...visitorData, [extracted.extracted_field]: extracted.value }
      : visitorData;

    const updatedStage = updatedVisitorData.status === 'closed' ? 'success' : stage;

    // Send email notification on transition to success
    if (updatedStage === 'success' && stage !== 'success') {
      // Fire and forget (don't await so we don't slow down the response)
      sendBrevoEmail(updatedVisitorData, reply);
    }

    return NextResponse.json({ reply, updatedVisitorData, updatedStage });
  } catch (err: any) {
    console.error("\n[GROQ DEBUG]");
    console.error("SDK: groq-sdk");
    console.error("MODEL: openai/gpt-oss-20b");
    if (err.status) console.error(`STATUS: ${err.status}`);
    console.error(`ERROR: ${err.message}`);
    console.error("STAGE: REQUEST\n");

    if (err.status === 429) {
      return NextResponse.json(
        { error: 'Give me a moment. Even I need to catch my breath sometimes.' },
        { status: 429 }
      );
    }
    const fallback = 'I couldn\'t generate your response right now.\nPlease try again.';
    return NextResponse.json(
      { error: fallback },
      { status: 500 }
    );
  }
}
