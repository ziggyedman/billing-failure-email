"use client";

export function CodeBlock({
  code,
  compact = false,
  inContainer = false,
}: {
  code: string;
  compact?: boolean;
  inContainer?: boolean;
}) {
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
      borderRadius: inContainer ? 0 : compact ? 6 : 0,
      marginTop: inContainer ? 0 : compact ? 10 : 0,
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
      border: "1px solid #e4e4e7",
      borderRadius: 8,
      overflow: "hidden",
      marginTop: 12,
      background: "#fafafa",
    }}>
      <div style={{
        background: "#f4f4f5",
        borderBottom: "1px solid #e4e4e7",
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        minHeight: 40,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d4d4d8", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d4d4d8", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d4d4d8", flexShrink: 0 }} />
        <span style={{
          marginLeft: 10,
          fontSize: 12,
          color: "#71717a",
          fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        }}>
          {filename}
        </span>
      </div>
      <CodeBlock code={code} compact inContainer />
    </div>
  );
}
