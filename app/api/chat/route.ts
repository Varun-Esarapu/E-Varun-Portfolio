export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY environment variable is not set');
      return new Response("Chat assistant configuration error. Please ensure GROQ_API_KEY is configured.", { status: 500 });
    }

    const systemPrompt = `You are Varun Esarapu's personal AI portfolio assistant.
Your job is to answer questions from recruiters and visitors about Varun's experience, skills, and projects.

Key information about Varun:
- Education: Holds a Bachelor's degree (B.E.) in Electronics and Communication Engineering from HKBK College of Engineering, Bangalore (GPA: 8.71/10).
- Experience: AI/ML Developer Apprentice at D Square Consulting (May 2026 - Present), AI Operator Intern at XTransMatriX Consulting (Nov 2025 - Mar 2026).
- Languages & Databases: Python, C, SQL, MySQL, MongoDB.
- Frameworks: Django, Django REST Framework, RESTful APIs.
- Libraries & ML: TensorFlow, PyTorch, Keras, Pandas, NumPy, scikit-learn, Matplotlib.
- Tools & Cloud: Git, AWS (EC2, S3), Jupyter Notebook.
- Projects: Vehicle Service Management System (Django/REST), Real-time Speech Emotion Recognition (CNN/Raspberry Pi), Text Emotion Classification (LSTM/TensorFlow), Personalized Movie Recommendation System (Collaborative Filtering).
- Certifications: Architecting SAP on AWS (Nov 2025), Machine Learning Expert: Introduction to MATLAB (Sep 2024), Machine Learning with Python (freeCodeCamp, 2022), Scientific Computing with Python (freeCodeCamp, 2022), Responsive Web Design (freeCodeCamp, 2021).
- Extracurriculars: Hosted and coordinated multiple college fests managing logistics/sponsors; Organized domain-specific ECE workshops (VACs) for 60+ participants; Served as Event Coordinator for Technisium 2025 overseeing 8 technical events with 150+ teams.
- Contact & Links: Email (varunesarapu@gmail.com), LinkedIn (https://www.linkedin.com/in/varunesarapu/), GitHub (https://github.com/Varun-Esarapu).
- Tone: Professional, concise, helpful, and slightly enthusiastic.

Strict Guardrails:
- ONLY answer questions using the facts provided above. Do not hallucinate or guess any unprovided information. If you do not know the answer based on the prompt, state that you do not have that information.
- ALWAYS provide the direct URL link in markdown format when asked for his LinkedIn or GitHub, exactly like this: [LinkedIn](https://www.linkedin.com/in/varunesarapu/) WITHOUT any newlines between the brackets and parentheses.
- If asked to write code, solve math, or act as a general AI, politely decline and steer the conversation back to Varun's portfolio.
- Keep responses concise (under 3-4 sentences). Recruiters are busy.
- FORMATTING: Frequently use bold markdown (**text**) to highlight key entities like college names, company names, project names, and specific technologies.`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...(messages || []).map((m: any) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content || m.text || '')
      })).filter((m: any) => m.content.trim() !== '')
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        stream: true,
        messages: formattedMessages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq direct API error:', response.status, err);
      return new Response("I'm currently receiving too many requests! Please wait a moment and try again, or email Varun directly at varunesarapu@gmail.com.", { status: 429 });
    }

    // Stream the SSE text chunks directly to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === 'data: [DONE]') continue;
              if (trimmed.startsWith('data: ')) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const delta = json.choices?.[0]?.delta?.content;
                  if (delta) {
                    controller.enqueue(encoder.encode(delta));
                  }
                } catch (e) {
                  // ignore partial line parsing
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-transform'
      }
    });
  } catch (error: any) {
    console.error('Route handler error:', error);
    return new Response("I encountered an error connecting to my brain. Please try again later.", { status: 500 });
  }
}
