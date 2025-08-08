

# Indian Judicial Explainable Framework (IJEF)

An AI-driven framework for criminal case recommendation and judgment prediction using past precedents, legal acts, and sections — with transparency through explainable AI.

![IJEF Architecture](https://raw.githubusercontent.com/thanesar/Indian-Judicial-Explainable-Framework-for-AI-Driven-Criminal-Judgment-Assessment-Case-Recommendation/main/IJEF%20Architecture.png)

Link for NayayaBERT Model - https://colab.research.google.com/drive/1EW0movyLSGBP6rMYG_QYW1RkWR7fkHsL#scrollTo=V64rmoAcGC-1
---

## 📌 Objectives

The primary objectives of IJEF are:

1. To develop an AI-powered system for criminal case recommendation, helping lawyers and judges find relevant precedents, acts, and sections efficiently.  
2. To build an explainable AI framework for criminal judgment assessment, ensuring transparency and reliability in legal decision-making.  
3. To enhance judicial consistency by identifying patterns in past criminal rulings, reducing discrepancies in similar cases.  
4. To improve overall judicial efficiency and access to justice, enabling faster criminal case resolution and informed legal research.

---

## 💻 Tech Stack

- **Python 3**
- **BERT Transformer (HuggingFace)**
- **Chroma DB and FAISS** – for vector similarity search
- **SHAP & Captum** – for Explainable AI (XAI)
- **React and Flask** – for Front End Developement
- **RAG (Retrieval-Augmented Generation)** – for generating structured legal reasoning

---

## 🧠 Algorithm / Models Used

- **NyayaBERT**: A fine-tuned version of LegalBERT on Indian Legal Reasoning Dataset (ILRD).
- **FAISS + Chroma Vector DB**: To store and retrieve embeddings of past legal cases and statutes.
- **RAG Framework**: To generate structured legal justifications using retrieved precedents and acts.
- **SHAP and Captum**: Post-hoc XAI tools used to justify model decisions via feature attribution.

---
