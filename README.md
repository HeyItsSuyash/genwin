# GenWin: Information Trust Evaluation Platform

**GenWin** is a high-performance analytical engine designed to evaluate the trustworthiness of information, claims, and datasets in real-time. Built with a focus on speed, precision, and architectural integrity, GenWin leverages advanced LLMs to provide structured insights into the credibility of digital content.

## What it Does

GenWin acts as an "integrity engine" for information. It doesn't just check facts; it evaluates the logical consistency, source credibility, and contextual completeness of any given input.

- **Trust Scoring**: Generates a rigorous 0-100 metric based on verifiable evidence.
- **Verdict Extraction**: Provides a clear verdict (Likely True, Uncertain, Likely False) for any claim.
- **Evidence Mapping**: Lists supporting data points and identifies known contradictions.
- **Contextual Awareness**: Detects missing context that might alter the interpretation of a claim.

## Current State

The platform is currently in its core development phase, featuring:
- **The Trust Engine**: Powered by Groq (Llama-3-70b) for sub-second latency in complex reasoning.
- **Secure Authentication**: Firebase-driven login with automatic MongoDB user-profile synchronization.
- **Operational History**: A persistent log of all analyses, allowing users to track information integrity over time.

## Design Philosophy

GenWin is designed as a **"High-Performance Cockpit"**. Inspired by the aesthetic of ultra-fast database systems like ClickHouse, the interface is engineered for maximum focus and visual weight:

- **Obsidian Black Canvas**: A pure black (`#000000`) background to reduce visual noise.
- **Neon Volt Accents**: Acid yellow-green (`#faff69`) highlights for critical calls to action and metrics.
- **Aggressive Typography**: Utilizing Inter Black (900) for hero headlines to communicate power and speed.
- **Terminal Aesthetic**: A workspace designed to feel like a command center for truth assessment.

## Purpose

The project was designed for the purpose of **Basic Selection** and integrity evaluation—serving as a prototype for a larger intelligence platform that handles complex data streams with the same speed as a world-class database.

---

*Build with Next.js 16, Firebase, MongoDB, and Groq.*
