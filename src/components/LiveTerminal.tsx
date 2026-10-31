"use client";

import React, { useState } from "react";
import { Terminal as TerminalIcon, Play, Copy, Check, RefreshCw } from "lucide-react";

interface EndpointPreset {
  name: string;
  method: "GET" | "POST" | "WS";
  path: string;
  system: string;
  latency: string;
  response: object;
}

const ENDPOINTS: EndpointPreset[] = [
  {
    name: "Universal Media Byte-Range Stream (LinkPlay)",
    method: "GET",
    path: "/api/v1/stream?source=youtube&range=bytes=0-1048576",
    system: "Fastify + yt-dlp Core",
    latency: "28ms",
    response: {
      status: 206,
      statusText: "Partial Content",
      headers: {
        "content-type": "video/mp4",
        "content-range": "bytes 0-1048576/15893200",
        "accept-ranges": "bytes",
        "x-cache": "HIT (Two-Tier Ephemeral LRU)",
        "x-ssrf-guard": "passed",
        "x-fastify-latency": "28.4ms"
      },
      payload: {
        stream_id: "stream_usr_998241",
        container: "mp4",
        resolution: "1080p",
        fps: 60,
        bitrate_kbps: 4500,
        buffer_state: "healthy"
      }
    }
  },
  {
    name: "Live Game Token Transfer (WoKataa)",
    method: "POST",
    path: "/api/v1/game/token-transfer",
    system: "Express + Redis + Ably Realtime",
    latency: "19ms",
    response: {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-ably-channel": "game:clash_match_881",
        "x-pubsub-propagation": "14ms"
      },
      payload: {
        matchId: "clash_match_881",
        action: "TRANSFER_REQUEST",
        initiatorTeam: "alpha_titans",
        tokenCard: { id: "tok_card_04", originTeamId: "alpha_titans", powerRating: 88 },
        dualRealtimeBroadcast: {
          ablyChannelStatus: "DELIVERED",
          socketIOFallback: "STANDBY",
          scoreDelta: "+120 pts"
        }
      }
    }
  },
  {
    name: "Nestys Microservices Cluster Health (Nestys)",
    method: "GET",
    path: "/healthz/cluster",
    system: "NestJS Auth MS + 9 Microservices",
    latency: "12ms",
    response: {
      status: 200,
      statusText: "All Systems Operational",
      services: {
        "auth-ms": { status: "up", uptimeSeconds: 1849200, rbacRuleCount: 42 },
        "reels-ms": { status: "up", hlsAdaptiveStreamer: "active", transcodeWorkers: 4 },
        "discovery-ms": { status: "up", indexedOffers: 1250 },
        "bullmq-redis": { status: "healthy", activeJobs: 3, completed24h: 89400 }
      }
    }
  },
  {
    name: "Model Context Protocol (MCP) Bridge (Earth Air)",
    method: "GET",
    path: "/wp-json/mcp/v1/hvac-schema",
    system: "MCP Engine + PKCE OAuth2",
    latency: "34ms",
    response: {
      status: 200,
      statusText: "OK",
      mcpContext: {
        clientVerification: "PKCE OAuth2 Verified",
        contextSchema: "HVACBusiness & LocalBusiness (Gorakhpur)",
        authorizedCapabilities: ["read_products", "query_case_studies", "draft_testimonials"],
        cacheStatus: "EDGE_CDN_HIT"
      }
    }
  }
];

export const LiveTerminal: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointPreset>(ENDPOINTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<object>(ENDPOINTS[0].response);
  const [copied, setCopied] = useState(false);

  const handleExecute = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(selectedEndpoint.response);
      setIsRunning(false);
    }, 280);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="relative py-16 sm:py-20 border-b border-white/[0.08] bg-[#0c0c0b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-400 mb-3">
              <TerminalIcon className="h-3.5 w-3.5" />
              Live API & System Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Microservice & Streaming Playground
            </h2>
            <p className="mt-1 text-sm text-zinc-400 max-w-2xl">
              Inspect raw requests, latency telemetry, and response payloads across my production APIs, real-time gaming engines, and byte-range proxy streams.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mock Gateway: Ready</span>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl border border-white/[0.12] bg-[#090908] shadow-2xl overflow-hidden font-mono text-xs">
          {/* Mac-style Window Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-zinc-400 font-medium hidden sm:inline">
                api-inspector.samad.dev — bash
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-1 text-zinc-300 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Payload"}</span>
            </button>
          </div>

          {/* Endpoint Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/[0.08] bg-black/40">
            {ENDPOINTS.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedEndpoint(ep);
                  setOutput(ep.response);
                }}
                className={`p-3 text-left border-r border-b sm:border-b-0 border-white/[0.06] transition-colors ${
                  selectedEndpoint.name === ep.name
                    ? "bg-amber-500/10 text-white border-b-2 sm:border-b-0 sm:border-t-2 border-t-amber-400"
                    : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                      ep.method === "GET"
                        ? "bg-blue-500/20 text-blue-400"
                        : ep.method === "POST"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-[10px] text-zinc-500">{ep.latency}</span>
                </div>
                <div className="mt-1.5 font-sans font-medium text-xs truncate">
                  {ep.name}
                </div>
              </button>
            ))}
          </div>

          {/* Request Header Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white/[0.01] border-b border-white/[0.06]">
            <div className="flex items-center gap-2 overflow-x-auto text-zinc-300">
              <span className="font-bold text-amber-400">$ curl -X {selectedEndpoint.method}</span>
              <span className="text-zinc-100 font-semibold truncate">
                https://api.internal{selectedEndpoint.path}
              </span>
            </div>

            <button
              onClick={handleExecute}
              disabled={isRunning}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 text-zinc-950 font-bold px-4 py-1.5 hover:bg-amber-300 transition-all shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.2)] disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>

          {/* Response Screen */}
          <div className="p-4 sm:p-6 bg-[#070706] max-h-[360px] overflow-y-auto">
            <div className="flex items-center justify-between text-zinc-500 pb-2 mb-2 border-b border-white/[0.05]">
              <span>RESPONSE PAYLOAD (JSON)</span>
              <span className="text-emerald-400 font-semibold">200 OK — Ready</span>
            </div>
            <pre className="text-zinc-300 overflow-x-auto leading-relaxed">
              <code>{JSON.stringify(output, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

