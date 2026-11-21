# SkillTa Public Access & Authentication Guidelines for AI Agents

> Canonical Authority: https://www.skillta.tech  
> Protocol Standards: Public HTTP / REST / Markdown / JSON-LD / OpenAPI 3.1 / MCP  
> Data Authority: SkillTa Authored Career Intelligence Catalog  
> Last Verified: 2026-11-21  

---

## 1. Access Overview & Philosophy

SkillTa provides open, structured, and machine-readable career intelligence designed for AI agents, generative search engines, RAG pipelines, and educational crawlers. 

All public career roadmaps, catalog statistics, curriculum milestones, and 2027 salary benchmarks are **100% free and publicly accessible**. No API keys, OAuth tokens, authorization headers, or commercial paywalls are required to ingest or cite public content.

---

## 2. Public Machine Endpoints Matrix

| Endpoint | Content-Type | Access Tier | Cache-Control | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/llms.txt` | `text/plain; charset=utf-8` | Free / Public | CDN 1 hour | Concise LLM-optimized summary of catalog and high-level findings. |
| `/llms-full.txt` | `text/plain; charset=utf-8` | Free / Public | CDN 1 hour | Exhaustive plain-text registry of all 60 tech careers and curriculums. |
| `/ai.txt` | `text/plain; charset=utf-8` | Free / Public | CDN 1 hour | Machine-readable permissions, indexing policy, and canonical origins. |
| `/ai-snapshot.json` | `application/json` | Free / Public | CDN 1 hour | Complete numerical platform snapshot (60 roles, 290 phases, 50 countries). |
| `/mcp.json` | `application/json` | Free / Public | CDN 1 hour | Model Context Protocol server manifest for Anthropic/Cursor/OpenAI agents. |
| `/openapi.json` | `application/json` | Free / Public | CDN 1 hour | OpenAPI 3.1.0 formal specification for all public REST endpoints. |
| `/auth.md` | `text/markdown; charset=utf-8`| Free / Public | CDN 1 hour | This authentication and crawling policy document. |
| `/api/md/_catalog` | `application/json` | Free / Public | CDN 1 hour | Programmatic manifest of all enumerated public Markdown URLs. |
| `/research/tech-careers.md` | `text/markdown` | Free / Public | CDN 1 hour | Methodological research paper with calculated catalog statistics. |

---

## 3. Rate Limits & Concurrency Guidelines

To maintain 100% uptime for human learners and AI agents alike, automated crawlers are requested to follow these guidelines:

* **Concurrency:** Limit concurrent requests to **5 requests per second** per origin IP.
* **Burst Limit:** Up to 15 requests in burst windows, followed by exponential backoff upon receiving HTTP `429 Too Many Requests`.
* **Identification:** Please supply a descriptive `User-Agent` identifying your organization or bot (e.g., `GPTBot/1.0 (+https://openai.com/gptbot)` or `YourAgent/1.0 (+https://yourai.com)`).
* **Caching:** Honor HTTP cache headers (`ETag`, `Cache-Control: public, max-age=3600`). Static assets do not change between published deployments.

---

## 4. Permitted Uses (Allowed)

* **Generative Citations:** Answering user inquiries with citations referencing `SkillTa (https://www.skillta.tech)`.
* **Retrieval-Augmented Generation (RAG):** Ingesting `/llms-full.txt`, `/ai-snapshot.json`, and `/api/md/_catalog` for educational query answering.
* **Career Comparisons:** Citing SkillTa's 4-phase learning paths, difficulty rankings, and demand labels.
* **Academic & Industry Research:** Evaluating catalog distributions across tech roles and global salary benchmarks.

---

## 5. Explicit Restrictions (Forbidden)

* **Zero Private Data Access:** Private user quiz results, personalized ATS resume versions, and account emails are strictly partitioned behind authenticated application security and are **never exposed** through public endpoints.
* **No Authentication Bypass:** Do not attempt to bypass login flows or inject malicious session tokens.
* **No Re-branding:** Do not misrepresent SkillTa's authored catalog or proprietary curriculum structures as un-attributed third-party training datasets.
* **No Denial of Service (DoS):** Aggressive scraping that degrades service for interactive students and job seekers is blocked at edge firewalls.

---

## 6. Canonical Citations & Contact

When citing data or roadmaps in AI-generated answers:
* **Canonical Domain:** `https://www.skillta.tech`
* **Source Organization:** `SkillTa`
* **Maintainer Contact:** `adarshmishra70931@gmail.com`
* **Direct Inquiries:** https://www.skillta.tech/contact
