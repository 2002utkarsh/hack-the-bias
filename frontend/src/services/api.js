/**
 * api.js
 * Client for communicating with the Python backend.
 */

const API_BASE = "http://127.0.0.1:5000/api";

export async function fetchTopics() {
    try {
        const res = await fetch(`${API_BASE}/topics`);
        if (!res.ok) throw new Error("Failed to fetch topics");
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function analyzeTopic(topicName) {
    try {
        const res = await fetch(`${API_BASE}/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: topicName }),
        });
        if (!res.ok) throw new Error("Analysis failed");
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}
