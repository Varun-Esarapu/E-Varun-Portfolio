export const maxDuration = 30;

function getFallbackAnswer(lastMessage: string): string {
  const query = (lastMessage || '').toLowerCase();

  if (query.includes('experience') || query.includes('work') || query.includes('d square') || query.includes('xtransmatrix') || query.includes('job') || query.includes('career')) {
    return "Varun has completed **1 internship**, **1 apprenticeship**, and is now working **full-time**:\n- **Jr. AI & ML Engineer (Full-Time)** at **D Square Consulting Services Pvt Ltd** (Nov 2026 – Present; previously **Apprentice**, May – Nov 2026) — engineering end-to-end ML workflows spanning data ingestion, model prototyping, and cloud deployment.\n- **AI Operator Intern** at **Xtransmatrix Consulting Services Pvt Ltd** (Nov 2025 – Mar 2026) — managing Human-in-the-Loop (HITL) dataset validation and LLM output evaluation on a US-based healthcare AI platform.";
  }

  if (query.includes('project') || query.includes('ml') || query.includes('machine learning') || query.includes('auto-stair') || query.includes('stair') || query.includes('rag') || query.includes('vehicle') || query.includes('speech') || query.includes('recommendation') || query.includes('cinematch')) {
    return "Varun has engineered four key production projects: \n1. **Auto-STAIR**: Agentic multi-hop document retrieval using **LangGraph** and zero-shot Trie prefix validation to eliminate hallucinated routing paths. Check out the [Live Demo](https://huggingface.co/spaces/varun-e/Auto-STAIR) on HuggingFace and [GitHub](https://github.com/Varun-Esarapu/Auto-STAIR).\n2. **Cinematch**: Distributed movie recommendation engine on 32M+ interaction records using **PySpark 3.5 MLlib ALS**, sub-15ms inference latency, Django REST microservices, and Streamlit. Check out the [Live App](https://cine-matchai.streamlit.app) and [GitHub](https://github.com/Varun-Esarapu/movie_rec).\n3. **Vehicle Service Management System**: RESTful backend with **Django REST Framework** with state-machine validation and automated cost calculation.\n4. **Real-Time Speech Emotion Recognition**: Edge acoustic ML pipeline extracting MFCCs with Librosa and CNN classification deployed on Raspberry Pi.";
  }

  if (query.includes('skill') || query.includes('stack') || query.includes('python') || query.includes('django') || query.includes('langgraph') || query.includes('rag') || query.includes('library') || query.includes('tool') || query.includes('database')) {
    return "Varun's core technical stack includes:\n- **Agentic AI & ML**: **LangGraph**, **LangChain**, **PyTorch**, **TensorFlow**, **scikit-learn**, **PySpark (MLlib)**, **Agentic RAG**, **Groq**, **Librosa**\n- **Backend & Cloud**: **FastAPI**, **Django (DRF)**, **Streamlit**, **Docker**, **AWS (EC2, S3)**, **PostgreSQL**, **MySQL**, **MongoDB**\n- **Languages & Core**: **Python**, **SQL**, **C**, **Trie Indexing**\n- **Core Competencies**: Multi-Hop Retrieval, LLM Evaluation, HITL Validation, Distributed Systems.";
  }

  if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('gpa') || query.includes('cgpa') || query.includes('hkbk')) {
    return "Varun graduated with a **Bachelor of Engineering (B.E.)** in **Electronics and Communication Engineering** from **HKBK College of Engineering, Bangalore**, graduating with an impressive **8.71 / 10 CGPA**.";
  }

  if (query.includes('certif') || query.includes('aws') || query.includes('sap') || query.includes('matlab') || query.includes('freecodecamp')) {
    return "Varun holds multiple technical certifications including **Architecting SAP on AWS** (Nov 2025), **Machine Learning Expert: Introduction to MATLAB** (Sep 2024), **Machine Learning with Python** (freeCodeCamp), and **Scientific Computing with Python** (freeCodeCamp).";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('linkedin') || query.includes('github') || query.includes('reach')) {
    return "You can reach Varun directly via:\nEmail: [varunesarapu@gmail.com](mailto:varunesarapu@gmail.com)\nLinkedIn: [varunesarapu](https://www.linkedin.com/in/varunesarapu/)\nGitHub: [Varun-Esarapu](https://github.com/Varun-Esarapu)\n\nHe is actively available for full-time AI & Systems engineering roles!";
  }

  return "Varun Esarapu is an **AI & Systems Engineer** with proven industry experience at **D Square Consulting** (Apprenticeship) and **XTransMatriX Consulting** (Internship). He holds a **B.E. degree (8.71 CGPA)** and specializes in production machine learning pipelines and **Django REST architectures**. Feel free to ask about his experience, projects, tech stack, or contact information!";
}

function streamStaticText(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Chunk the text slightly to give a natural streaming feel
      const words = text.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache, no-transform'
    }
  });
}

export async function POST(req: Request) {
  let lastUserMessage = '';
  try {
    const { messages } = await req.json();
    const lastMsgObj = (messages || []).filter((m: any) => m.role === 'user').pop();
    lastUserMessage = String(lastMsgObj?.content || lastMsgObj?.text || '');

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn('GROQ_API_KEY environment variable is not set — using local knowledge responder.');
      return streamStaticText(getFallbackAnswer(lastUserMessage));
    }

    const systemPrompt = `You are Varun Esarapu's personal AI portfolio assistant.
Your job is to answer questions from recruiters and visitors about Varun's experience, skills, and projects.

Key information about Varun:
- Education: Holds a Bachelor's degree (B.E.) in Electronics and Communication Engineering from HKBK College of Engineering, Bangalore (GPA: 8.71/10). Graduated.
- Experience: Jr. AI & ML Engineer at D Square Consulting Services Pvt Ltd (Nov 2026 – Present, previously Apprentice May – Nov 2026), AI Operator Intern at Xtransmatrix Consulting Services Pvt Ltd (Nov 2025 – Mar 2026).
- Languages & Databases: Python, SQL, C, PostgreSQL, MySQL, MongoDB.
- Frameworks & Backend: FastAPI, Django (DRF), Streamlit, RESTful APIs, Docker, AWS (EC2, S3).
- AI / ML & Agentic Stack: LangGraph, LangChain, PyTorch, TensorFlow, Keras, scikit-learn, PySpark (MLlib), Groq, Pandas, NumPy, Librosa.
- Core Competencies: Agentic RAG, Multi-Hop Retrieval, Trie Routing, NLP, Deep Learning, Recommendation Systems, LLM Evaluation, HITL Validation.
- Projects: Auto-STAIR (Agentic Multi-Hop Retrieval with LangGraph & Trie on HuggingFace), Cinematch (Distributed Movie Recommendation on 32M+ records with PySpark 3.5 & sub-15ms latency), Vehicle Service Management System (Django/REST with state-machine lifecycle), Real-Time Speech Emotion Recognition (MFCC with Librosa & CNN on Raspberry Pi).
- Certifications: Architecting SAP on AWS (Nov 2025), Machine Learning with Python (freeCodeCamp, 2022), Scientific Computing with Python (freeCodeCamp, 2022), Python Programming (SoloLearn, 2022).
- Extracurriculars: Event Coordinator for Technisium 2025 (8 technical events with 150+ teams); Workshop Organizer for domain-specific ECE VACs (60+ participants).
- Contact & Links:
  - Email: varunesarapu@gmail.com
  - LinkedIn: https://www.linkedin.com/in/varunesarapu/ (username: varunesarapu)
  - GitHub: https://github.com/Varun-Esarapu (username: Varun-Esarapu)
- Tone: Professional, concise, helpful, and confident.

Strict Guardrails:
- NEVER say Varun has "2 years" or "2+ years" of experience. Accurately state that he has completed 1 internship (AI Operator Intern at Xtransmatrix, Nov 2025 – Mar 2026), 1 apprenticeship (D Square Consulting, May – Nov 2026), and is now a full-time Jr. AI & ML Engineer at D Square Consulting (Nov 2026 – Present).
- ONLY answer questions using the facts provided above. Do not hallucinate or guess any unprovided information.
- ALWAYS format contact links using his exact username as the anchor text:
  Email: varunesarapu@gmail.com
  LinkedIn: [varunesarapu](https://www.linkedin.com/in/varunesarapu/)
  GitHub: [Varun-Esarapu](https://github.com/Varun-Esarapu)
  NEVER write "LinkedIn: LinkedIn" or "GitHub: GitHub" — always make it "LinkedIn: [varunesarapu](...)" and "GitHub: [Varun-Esarapu](...)".
- If asked to write code, solve math, or act as a general AI, politely decline and steer the conversation back to Varun's portfolio.
- Keep responses concise (under 3-4 sentences). Recruiters are busy.
- Frequently use bold markdown (**text**) to highlight key entities like college names, company names, project names, and specific technologies.`;

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
      console.warn('Groq API returned non-OK status:', response.status, '— using intelligent fallback.');
      return streamStaticText(getFallbackAnswer(lastUserMessage));
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
          console.error('Streaming read error:', err);
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
    return streamStaticText(getFallbackAnswer(lastUserMessage));
  }
}
