"use client";

export function CodeBlock({ code, compact = false }: { code: string; compact?: boolean }) {
  const lines = code.split("\n");
  const fs = compact ? 11.5 : 12.5;
  const gutterW = compact ? 28 : 36;
  const vPad = compact ? "10px" : "20px";
  const hPad = compact ? "14px" : "24px";
  return (
    <div style={{
      display: "flex",
      overflowX: "auto",
      background: "#18181b",
      borderRadius: compact ? 6 : 0,
      marginTop: compact ? 10 : 0,
      marginBottom: 0,
    }}>
      <div style={{
        flexShrink: 0,
        width: gutterW,
        paddingTop: vPad,
        paddingBottom: vPad,
        paddingRight: 8,
        textAlign: "right",
        color: "#52525b",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        fontSize: fs,
        lineHeight: 1.65,
        userSelect: "none",
        borderRight: "1px solid #27272a",
      }}>
        {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
      </div>
      <pre style={{
        margin: 0,
        paddingTop: vPad,
        paddingBottom: vPad,
        paddingLeft: hPad,
        paddingRight: hPad,
        fontSize: fs,
        lineHeight: 1.65,
        color: "#e4e4e7",
        background: "transparent",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        whiteSpace: "pre",
        flex: 1,
        minWidth: 0,
      }}>
        {code}
      </pre>
    </div>
  );
}

export function FileCodeBlock({ filename, code }: { filename: string; code: string }) {
  return (
    <div style={{
      border: "1px solid #27272a",
      borderRadius: 8,
      overflow: "hidden",
      marginTop: 12,
    }}>
      <div style={{
        background: "#27272a",
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        minHeight: 36,
        borderBottom: "1px solid #3f3f46",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f3f46", flexShrink: 0 }} />
        <span style={{
          marginLeft: 8,
          fontSize: 11,
          color: "#a1a1aa",
          fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
          letterSpacing: "0.1px",
        }}>
          {filename}
        </span>
      </div>
      <CodeBlock code={code} compact />
    </div>
  );
}
