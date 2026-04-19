(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/steps.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STEPS",
    ()=>STEPS
]);
const STEPS = [
    {
        id: "account",
        title: "Create a Resend account",
        subtitle: "Sign up and grab an API key",
        duration: "~2 min",
        requiresInput: true
    },
    {
        id: "domain",
        title: "Verify your sending domain",
        subtitle: "Add DNS records so you can send from your own address",
        duration: "~10 min"
    },
    {
        id: "template",
        title: "Email template & live preview",
        subtitle: "How the template is built — edit values and see changes instantly",
        duration: "~4 min"
    },
    {
        id: "send",
        title: "Send the email",
        subtitle: "Inspect the API route that fires the email, then send a real one",
        duration: "~1 min",
        requiresInput: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompletedBadge",
    ()=>CompletedBadge,
    "NumberedSection",
    ()=>NumberedSection,
    "numberedStyles",
    ()=>numberedStyles,
    "stepStyles",
    ()=>stepStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const stepStyles = {
    prose: {
        fontSize: 14,
        lineHeight: 1.75,
        color: "#3f3f46",
        margin: "0 0 16px"
    },
    h3: {
        fontSize: 14,
        fontWeight: 600,
        color: "#18181b",
        margin: "28px 0 10px",
        letterSpacing: "-0.1px"
    },
    ol: {
        fontSize: 14,
        lineHeight: 1.75,
        color: "#3f3f46",
        paddingLeft: 20,
        margin: "0 0 16px"
    },
    li: {
        marginBottom: 8
    },
    inlineCode: {
        background: "#f4f4f5",
        padding: "1px 5px",
        borderRadius: 4,
        fontSize: 12.5,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        color: "#18181b",
        border: "1px solid #e4e4e7"
    },
    codeBlock: {
        background: "#18181b",
        color: "#e4e4e7",
        padding: "16px 20px",
        borderRadius: 8,
        fontSize: 12.5,
        lineHeight: 1.65,
        overflow: "auto",
        margin: "0 0 16px",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        border: "1px solid #27272a"
    },
    link: {
        color: "#18181b",
        textDecoration: "underline",
        textUnderlineOffset: "3px"
    },
    callout: {
        background: "#fafafa",
        border: "1px solid #e4e4e7",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 13,
        lineHeight: 1.65,
        color: "#3f3f46",
        margin: "16px 0"
    },
    calloutStrong: {
        fontWeight: 600,
        color: "#18181b"
    },
    label: {
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        color: "#3f3f46",
        marginBottom: 6,
        letterSpacing: "0.1px"
    },
    input: {
        display: "block",
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #e4e4e7",
        borderRadius: 7,
        fontSize: 14,
        boxSizing: "border-box",
        fontFamily: "inherit",
        color: "#18181b",
        background: "#ffffff",
        outline: "none",
        transition: "border-color 150ms ease"
    },
    hint: {
        fontSize: 12,
        color: "#a1a1aa",
        margin: "6px 0 0",
        lineHeight: 1.6
    },
    primaryBtn: {
        background: "#18181b",
        color: "#ffffff",
        border: "none",
        borderRadius: 8,
        padding: "9px 18px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        letterSpacing: "-0.1px",
        transition: "opacity 150ms ease"
    },
    primaryBtnDisabled: {
        background: "#d4d4d8",
        color: "#a1a1aa",
        border: "none",
        borderRadius: 8,
        padding: "9px 18px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "not-allowed",
        fontFamily: "inherit"
    },
    completedBanner: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: "#15803d",
        margin: "0 0 20px",
        display: "flex",
        alignItems: "center",
        gap: 8
    },
    fieldGrid: {
        display: "grid",
        gap: 14,
        margin: "16px 0"
    },
    actionsRow: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 28,
        paddingTop: 20,
        borderTop: "1px solid #e4e4e7"
    },
    errorBanner: {
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: "#dc2626",
        margin: "12px 0",
        wordBreak: "break-word"
    },
    successBanner: {
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 14,
        color: "#15803d",
        margin: "12px 0"
    }
};
const numberedStyles = {
    section: {
        display: "flex",
        gap: 16,
        marginBottom: 24
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#18181b",
        color: "#ffffff",
        fontSize: 11,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2
    },
    content: {
        flex: 1,
        minWidth: 0
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        color: "#18181b",
        marginBottom: 6,
        letterSpacing: "-0.1px"
    },
    body: {
        fontSize: 13,
        lineHeight: 1.7,
        color: "#3f3f46",
        margin: 0
    }
};
function NumberedSection({ num, title, last, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...numberedStyles.section,
            marginBottom: last ? 0 : 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: numberedStyles.circle,
                children: num
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: numberedStyles.content,
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: numberedStyles.title,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                        lineNumber: 218,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: numberedStyles.body,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
_c = NumberedSection;
function CompletedBadge() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: stepStyles.completedBanner,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 14 14",
                fill: "none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2.5 7l3 3 6-6",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Step complete. You can revisit it anytime."
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_c1 = CompletedBadge;
var _c, _c1;
__turbopack_context__.k.register(_c, "NumberedSection");
__turbopack_context__.k.register(_c1, "CompletedBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepAccount",
    ()=>StepAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx [app-client] (ecmascript)");
"use client";
;
;
function StepAccount({ apiKey, onApiKeyChange, onComplete, alreadyCompleted }) {
    const looksValid = /^re_[A-Za-z0-9_-]{10,}$/.test(apiKey.trim());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            alreadyCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletedBadge"], {}, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 22,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                children: "Resend is the email provider we're going to use. The free plan lets you send 100 emails per day, which is more than enough for this tutorial."
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 1,
                title: "Create a Resend account",
                children: [
                    "Open",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://resend.com/signup",
                        target: "_blank",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].link,
                        children: "resend.com/signup"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    " ",
                    "in a new tab and create an account. Email + password or GitHub OAuth, either works."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 2,
                title: "Generate an API key",
                children: [
                    "Once you're in, go to",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://resend.com/api-keys",
                        target: "_blank",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].link,
                        children: "resend.com/api-keys"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    " ",
                    "and click ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Create API Key"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 43,
                        columnNumber: 19
                    }, this),
                    ". Name it something like",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                        children: "tutorial-dev"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    ". For permission,",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Full access"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    " is fine."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 3,
                title: "Copy the key",
                last: true,
                children: [
                    "The key starts with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                        children: "re_"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 49,
                        columnNumber: 29
                    }, this),
                    ". Resend only shows it once — don't navigate away before pasting it below."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].callout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].calloutStrong,
                        children: "Heads up:"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    " this key is secret. It'll be stored in your browser's localStorage for the tutorial. Don't paste it into public pastebins or commit it to git."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].label,
                        htmlFor: "apiKey",
                        children: "Paste your API key"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "apiKey",
                        type: "password",
                        value: apiKey,
                        onChange: (e)=>onApiKeyChange(e.target.value),
                        placeholder: "re_...",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].input,
                        autoComplete: "off",
                        spellCheck: false
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].hint,
                        children: "Stored only in your browser. The app sends it to its own API route when you hit Send in Step 4 — it never leaves the session otherwise."
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].actionsRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: looksValid ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtn : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtnDisabled,
                        disabled: !looksValid,
                        onClick: onComplete,
                        children: alreadyCompleted ? "Continue" : "Mark complete & continue"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    !looksValid && apiKey.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: "#dc2626"
                        },
                        children: [
                            "Doesn't look like a Resend key (should start with",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "re_"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            ")."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StepAccount;
var _c;
__turbopack_context__.k.register(_c, "StepAccount");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepDomain",
    ()=>StepDomain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx [app-client] (ecmascript)");
"use client";
;
;
function StepDomain({ fromEmail, onFromEmailChange, onComplete, alreadyCompleted }) {
    const canContinue = /@.+\..+/.test(fromEmail.trim());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            alreadyCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletedBadge"], {}, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 22,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                children: [
                    "To send from an address on your domain (like",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                        children: "billing@yourdomain.com"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    "), Resend needs proof you control it. It does this by checking DNS records you add."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].h3,
                children: "How to verify your domain"
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 1,
                title: "Add your domain in Resend",
                children: [
                    "Go to",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://resend.com/domains",
                        target: "_blank",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].link,
                        children: "Domains → Add Domain"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    ". Enter your domain and pick the region closest to your users."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 2,
                title: "Note the DNS records Resend gives you",
                children: "Resend shows the records to add. Typically an MX record for bounces, a TXT for SPF, and TXT or CNAME records for DKIM. Leave that tab open."
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 3,
                title: "Add the records in your DNS provider",
                children: [
                    "In Namecheap, Cloudflare, or wherever your domain lives, add each record exactly as shown. The ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Host"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 47,
                        columnNumber: 31
                    }, this),
                    " field is just the subdomain part."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                num: 4,
                title: "Verify in Resend",
                last: true,
                children: [
                    "Click ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Verify DNS Records"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 52,
                        columnNumber: 15
                    }, this),
                    " in Resend. Propagation usually takes a few minutes; some providers take up to an hour."
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].label,
                        htmlFor: "fromEmail",
                        children: 'Your "from" address'
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "fromEmail",
                        type: "email",
                        value: fromEmail,
                        onChange: (e)=>onFromEmailChange(e.target.value),
                        placeholder: "billing@yourdomain.com",
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].input,
                        autoComplete: "off",
                        spellCheck: false
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].hint,
                        children: [
                            "Must be on a domain you've verified in Resend. You can use any local-part (",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "billing@"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                                lineNumber: 72,
                                columnNumber: 23
                            }, this),
                            ", ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "noreply@"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                                lineNumber: 72,
                                columnNumber: 46
                            }, this),
                            ", etc.) — Resend only checks that the domain checks out."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].actionsRow,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: canContinue ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtn : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtnDisabled,
                    disabled: !canContinue,
                    onClick: onComplete,
                    children: alreadyCompleted ? "Continue" : "Mark complete & continue"
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = StepDomain;
var _c;
__turbopack_context__.k.register(_c, "StepDomain");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepTemplate",
    ()=>StepTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DEFAULTS = {
    customerName: "Alex",
    amount: "29.00",
    cardLast4: "4242",
    failureReason: "Your card was declined (insufficient_funds).",
    nextRetryDate: "in 3 days",
    companyName: "Acme, Inc."
};
const COMPONENTS = [
    {
        name: "Html",
        tag: "<Html>",
        badge: "root",
        needsImport: false,
        description: "The outermost wrapper for every React Email template. Sets the lang and dir attributes and outputs the <!DOCTYPE html> declaration.",
        when: "Always — every template must have exactly one Html as the root.",
        pasteHint: "Already the root of the template. Change the lang/dir attributes directly on line 46.",
        snippet: `// Already imported ✓
// import { Html } from "@react-email/components";

// Edit the existing <Html> tag at line 46:
<Html lang="en" dir="ltr">
  <Head />
  <Preview>{previewText}</Preview>
  <Body style={main}>
    ...
  </Body>
</Html>`
    },
    {
        name: "Head",
        tag: "<Head>",
        badge: "metadata",
        needsImport: false,
        description: "Holds email metadata, @font-face declarations, and @media query style blocks. Renders as <head> in the final HTML.",
        when: "When you need custom fonts (via <Font>) or mobile-responsive @media overrides. Most email styling is inline — Head is for the exceptions.",
        pasteHint: "Replace the self-closing <Head /> on line 48 with an opening/closing pair and add content inside.",
        snippet: `// Already imported ✓
// import { Head } from "@react-email/components";

// Replace <Head /> on line 48 with:
<Head>
  <style>{\`
    @media (max-width: 600px) {
      .mobile-text { font-size: 14px !important; }
    }
  \`}</style>
</Head>`
    },
    {
        name: "Preview",
        tag: "<Preview>",
        badge: "inbox",
        needsImport: false,
        description: "Hidden text that email clients display as the inbox snippet — the line visible before opening a message. Never appears in the email body itself.",
        when: "Always include it. It's one of the most impactful conversion levers in email. Keep it under 90 characters or it gets cut off.",
        pasteHint: "Already in the template on line 49. Edit the previewText variable near line 43 to change its content.",
        snippet: `// Already imported ✓
// import { Preview } from "@react-email/components";

// Edit the previewText variable near line 43:
const previewText = \`We couldn't process your \${currency} \${amount}. Update your card.\`;

// The <Preview> at line 49 uses it:
<Preview>{previewText}</Preview>`
    },
    {
        name: "Body",
        tag: "<Body>",
        badge: "layout",
        needsImport: false,
        description: "Sets the background color and base font for the entire email. Equivalent to the <body> tag — wraps everything the recipient sees.",
        when: "Always — place it directly inside Html, wrapping Container.",
        pasteHint: "Already in the template on line 50. Edit the `main` style object near the bottom of the file to change background color or font.",
        snippet: `// Already imported ✓
// import { Body } from "@react-email/components";

// Edit the existing <Body> on line 50,
// or update the \`main\` style object at the bottom of the file:
const main: React.CSSProperties = {
  backgroundColor: "#f0f4ff", // change the background color
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};`
    },
    {
        name: "Container",
        tag: "<Container>",
        badge: "layout",
        needsImport: false,
        description: "Centers content and caps its width. The primary layout wrapper inside Body. Renders as a centered table for Outlook compatibility.",
        when: "Always — set maxWidth between 560–600px. Wider emails don't render well in preview panes and mobile clients.",
        pasteHint: "Already in the template on line 51. Edit the `container` style object at the bottom of the file to change width, background, or border.",
        snippet: `// Already imported ✓
// import { Container } from "@react-email/components";

// Edit the \`container\` style object at the bottom of the file:
const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px 40px",
  maxWidth: "560px",   // increase to 600px for wider emails
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};`
    },
    {
        name: "Section",
        tag: "<Section>",
        badge: "layout",
        needsImport: false,
        description: "A block-level container. Renders as a <table> row internally to ensure Outlook compatibility. Use it anywhere you'd use a <div> on the web.",
        when: "For any distinct region: header, alert banner, content area, footer, colored band, or padding zone.",
        pasteHint: "Paste inside <Container> (between lines 51 and 121). Used for the logo, alert banner, details box, and button sections already.",
        snippet: `// Already imported ✓
// import { Section } from "@react-email/components";

// Paste inside <Container>, e.g. after the alertBanner Section (~line 57):
<Section style={{
  padding: "16px 24px",
  backgroundColor: "#fffbeb",
  borderLeft: "4px solid #f59e0b",
  marginBottom: "24px",
}}>
  <Text style={{ margin: 0, color: "#92400e", fontSize: 14 }}>
    ⏱ This offer expires in 48 hours.
  </Text>
</Section>`
    },
    {
        name: "Row / Column",
        tag: "<Row> + <Column>",
        badge: "layout",
        needsImport: true,
        description: "Multi-column layouts. Row is the grid container; Column is each cell. Renders as table-based layout for cross-client compatibility including Outlook.",
        when: "Two-column layouts: content + sidebar, logo + nav, icon + text. Use percentage widths on Column — they're the most reliable unit across email clients.",
        pasteHint: "Add Row, Column to the import on line 1. Then paste inside <Container> or inside a <Section>.",
        snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Link, Preview, Row, Column, Section, Text, // ← add Row, Column
} from "@react-email/components";

// 2. Paste inside <Container>, e.g. after the logoSection (~line 53):
<Row>
  <Column style={{ width: "60%", paddingRight: 16 }}>
    <Text style={{ margin: 0, fontWeight: 600 }}>Account status</Text>
    <Text style={{ margin: 0, color: "#6b7280" }}>Payment past due</Text>
  </Column>
  <Column style={{ width: "40%", textAlign: "right" }}>
    <Text style={{ margin: 0, fontWeight: 700, color: "#ef4444" }}>
      USD {amount}
    </Text>
  </Column>
</Row>`
    },
    {
        name: "Heading",
        tag: "<Heading>",
        badge: "text",
        needsImport: false,
        description: "Renders h1–h6 headings. Use it over a styled <Text> when the content is semantically a heading — it outputs the correct HTML element, which matters for accessibility.",
        when: "Email titles, section headers, and any text that functions as a heading. The as prop accepts 'h1' through 'h6'.",
        pasteHint: "Already in the template on line 59. Add another <Heading> inside <Container> to create a sub-section header.",
        snippet: `// Already imported ✓
// import { Heading } from "@react-email/components";

// Add a sub-section heading inside <Container>, e.g. before the detailsBox:
<Heading
  as="h3"
  style={{
    fontSize: 14,
    fontWeight: 600,
    color: "#6b7280",
    margin: "0 0 8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }}
>
  Payment details
</Heading>`
    },
    {
        name: "Text",
        tag: "<Text>",
        badge: "text",
        needsImport: false,
        description: "Paragraph text. Renders as a <p> tag with safe default resets that prevent email clients from adding unexpected margins.",
        when: "Every prose block — body copy, labels, detail rows, footers. The most-used component. Avoid raw <p> tags; use Text instead.",
        pasteHint: "Already used throughout the template. Add a new <Text> inside <Container> anywhere you need a paragraph.",
        snippet: `// Already imported ✓
// import { Text } from "@react-email/components";

// Add inside <Container>, e.g. after the button Section (~line 100):
<Text style={{
  fontSize: 13,
  color: "#9ca3af",
  lineHeight: "20px",
  margin: "0 0 12px",
  textAlign: "center",
}}>
  You have until {nextRetryDate} before your account is paused.
</Text>`
    },
    {
        name: "Button",
        tag: "<Button>",
        badge: "action",
        needsImport: false,
        description: "A CTA rendered as an anchor tag styled to look like a button. Email clients don't reliably support HTML <button> — Button outputs an <a> that works everywhere.",
        when: "Primary calls to action: 'Update payment method', 'View invoice', 'Reactivate subscription'. Always provide an href — the button is meaningless without a destination.",
        pasteHint: "Already in the template inside buttonContainer (~line 97). Add a secondary button in a new Section below it.",
        snippet: `// Already imported ✓
// import { Button } from "@react-email/components";

// Add a secondary CTA after the existing button Section (~line 100):
<Section style={{ textAlign: "center", marginTop: 12 }}>
  <Button
    href={supportUrl}
    style={{
      backgroundColor: "transparent",
      color: "#6b7280",
      padding: "8px 20px",
      borderRadius: 6,
      fontSize: 13,
      border: "1px solid #e5e7eb",
      display: "inline-block",
    }}
  >
    Contact support instead
  </Button>
</Section>`
    },
    {
        name: "Link",
        tag: "<Link>",
        badge: "action",
        needsImport: false,
        description: "A plain hyperlink. Renders as an <a> tag. Use inside Text for inline links; use Button for standalone CTA links.",
        when: "Inline links within a paragraph — 'Contact support', 'View your invoice', 'Unsubscribe'. Button handles full-width click targets better.",
        pasteHint: "Already used in the support line (~line 110). Wrap any word in an existing <Text> with <Link> to make it clickable.",
        snippet: `// Already imported ✓
// import { Link } from "@react-email/components";

// Edit the existing support Text (~line 109) to add or change a link:
<Text style={smallText}>
  Need help? Reach out at{" "}
  <Link href={supportUrl} style={{ color: "#2563eb" }}>
    our support page
  </Link>{" "}
  or call us at{" "}
  <Link href="tel:+18005551234" style={{ color: "#2563eb" }}>
    1-800-555-1234
  </Link>.
</Text>`
    },
    {
        name: "Img",
        tag: "<Img>",
        badge: "media",
        needsImport: true,
        description: "Email-safe image tag. src must be an absolute https:// URL — email clients cannot load relative paths. Always set width and height to prevent layout shift.",
        when: "Logos, product screenshots, hero banners. Add alt text for clients that block images by default (common in corporate environments).",
        pasteHint: "Add Img to the import on line 1. Then replace the text logo inside the logoSection Section (~line 52–54).",
        snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Section, Text, // ← add Img
} from "@react-email/components";

// 2. Replace the logoSection content (~line 52–54):
// Before:
// <Section style={logoSection}>
//   <Text style={logoText}>{productName}</Text>
// </Section>

// After:
<Section style={logoSection}>
  <Img
    src="https://yourdomain.com/logo.png"
    alt={productName}
    width={120}
    height={40}
    style={{ display: "block" }}
  />
</Section>`
    },
    {
        name: "Hr",
        tag: "<Hr>",
        badge: "layout",
        needsImport: false,
        description: "A horizontal divider line. Renders a <hr> element with safe cross-client styles. Visually separates content sections.",
        when: "Between content sections, between detail rows in a table-style layout, and before the footer. Already used in the payment details box.",
        pasteHint: "Already used inside the detailsBox and before the footer (~line 107). Add another <Hr> between any two sections inside <Container>.",
        snippet: `// Already imported ✓
// import { Hr } from "@react-email/components";

// Add between any two sections inside <Container>,
// e.g. between the button Section and the urgency Text (~line 101):
<Hr style={{
  borderColor: "#e5e7eb",
  borderWidth: 1,
  margin: "24px 0",
}} />`
    },
    {
        name: "Font",
        tag: "<Font>",
        badge: "style",
        needsImport: true,
        description: "Loads a web font via @font-face for clients that support it (Apple Mail, iOS Mail, Outlook on Mac). Falls back to fallbackFontFamily silently on Gmail and webmail.",
        when: "When brand typography matters and you have a hosted woff2 file. Include Font inside Head — not inside Body.",
        pasteHint: "Add Font to the import on line 1. Then replace <Head /> on line 48 with <Head>...</Head> and put <Font> inside it.",
        snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Font, Head, Heading, Hr, Html,
  Link, Preview, Section, Text, // ← add Font
} from "@react-email/components";

// 2. Replace <Head /> on line 48 with:
<Head>
  <Font
    fontFamily="Inter"
    fallbackFontFamily="Arial"
    webFont={{
      url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      format: "woff2",
    }}
    fontWeight={400}
    fontStyle="normal"
  />
</Head>`
    },
    {
        name: "Markdown",
        tag: "<Markdown>",
        badge: "content",
        needsImport: true,
        description: "Converts a markdown string to email-safe HTML at render time. Useful when email body content is stored as markdown in a database or CMS.",
        when: "Dynamic or user-authored content that lives outside code. Stick to headings, bold, italic, and links — not all markdown features are supported in email.",
        pasteHint: "Add Markdown to the import on line 1. Then replace any prose Text block inside <Container> with a <Markdown> block.",
        snippet: `// 1. Add to the import on line 1:
import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Link, Markdown, Preview, Section, Text, // ← add Markdown
} from "@react-email/components";

// 2. Replace a Text block inside <Container>, e.g. the paragraph at ~line 61:
// Before:
// <Text style={paragraph}>
//   We tried to charge your card...
// </Text>

// After:
<Markdown>{\`
We tried to charge your card ending in **\${cardLast4}** for your
**\${productName} \${planName}** subscription, but the payment didn't go through.
\`}</Markdown>`
    }
];
function buildPreviewUrl(values) {
    const p = new URLSearchParams({
        ...values,
        productName: "Acme",
        planName: "Pro",
        currency: "USD",
        updatePaymentUrl: "https://example.com/billing",
        supportUrl: "https://example.com/support"
    });
    return `/api/preview?${p.toString()}`;
}
function buildCodeSnippet(values) {
    return `import { Resend } from "resend";
import BillingFailureEmail from "@/emails/billing-failure";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "billing@yourdomain.com",
  to: ["customer@example.com"],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({
    customerName:     "${values.customerName}",
    productName:      "Acme",
    planName:         "Pro",
    amount:           "${values.amount}",
    currency:         "USD",
    cardLast4:        "${values.cardLast4}",
    failureReason:    "${values.failureReason}",
    nextRetryDate:    "${values.nextRetryDate}",
    companyName:      "${values.companyName}",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  }),
});`;
}
const FIELDS = [
    {
        key: "customerName",
        label: "Customer name"
    },
    {
        key: "amount",
        label: "Amount"
    },
    {
        key: "cardLast4",
        label: "Card last 4"
    },
    {
        key: "failureReason",
        label: "Failure reason",
        wide: true
    },
    {
        key: "nextRetryDate",
        label: "Next retry"
    },
    {
        key: "companyName",
        label: "Company name"
    }
];
const BADGE_COLORS = {
    root: {
        bg: "#fef3c7",
        color: "#92400e"
    },
    metadata: {
        bg: "#ede9fe",
        color: "#5b21b6"
    },
    inbox: {
        bg: "#dbeafe",
        color: "#1d4ed8"
    },
    layout: {
        bg: "#f0fdf4",
        color: "#166534"
    },
    text: {
        bg: "#f4f4f5",
        color: "#3f3f46"
    },
    action: {
        bg: "#fff1f2",
        color: "#9f1239"
    },
    media: {
        bg: "#fdf4ff",
        color: "#7e22ce"
    },
    style: {
        bg: "#fff7ed",
        color: "#9a3412"
    },
    content: {
        bg: "#f0f9ff",
        color: "#075985"
    }
};
function StepTemplate({ customerName, onCustomerNameChange, onComplete, alreadyCompleted }) {
    _s();
    const [mainTab, setMainTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("try");
    const [viewerTab, setViewerTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("code");
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...DEFAULTS,
        customerName
    });
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "StepTemplate.useState": ()=>buildPreviewUrl({
                ...DEFAULTS,
                customerName
            })
    }["StepTemplate.useState"]);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Template editor state
    const [templateCode, setTemplateCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [templateLoading, setTemplateLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [templateApplying, setTemplateApplying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customHtml, setCustomHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renderError, setRenderError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const templateFetched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    function set(key, val) {
        setValues((v)=>({
                ...v,
                [key]: val
            }));
    }
    function applyPreview() {
        setPreviewUrl(buildPreviewUrl(values));
        onCustomerNameChange(values.customerName);
        setCustomHtml(null); // reset any custom-rendered preview
    }
    async function applyTemplate() {
        setTemplateApplying(true);
        setRenderError(null);
        try {
            const res = await fetch("/api/render-custom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: templateCode
                })
            });
            const json = await res.json();
            if (!res.ok || json.error) {
                setRenderError(json.error ?? "Render failed.");
            } else {
                setCustomHtml(json.html);
                setViewerTab("preview");
            }
        } catch (e) {
            setRenderError(e.message);
        } finally{
            setTemplateApplying(false);
        }
    }
    function copy(name, snippet) {
        navigator.clipboard.writeText(snippet).catch(()=>{});
        setCopied(name);
        setTimeout(()=>setCopied(null), 2000);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StepTemplate.useEffect": ()=>{
            if (viewerTab === "preview" && !customHtml) setPreviewUrl(buildPreviewUrl(values));
            if (viewerTab === "template" && !templateFetched.current) {
                templateFetched.current = true;
                setTemplateLoading(true);
                fetch("/api/source?file=email-template").then({
                    "StepTemplate.useEffect": (r)=>r.text()
                }["StepTemplate.useEffect"]).then({
                    "StepTemplate.useEffect": (src)=>{
                        setTemplateCode(src);
                        setTemplateLoading(false);
                    }
                }["StepTemplate.useEffect"]).catch({
                    "StepTemplate.useEffect": ()=>setTemplateLoading(false)
                }["StepTemplate.useEffect"]);
            }
        }
    }["StepTemplate.useEffect"], [
        viewerTab
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            alreadyCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletedBadge"], {}, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                lineNumber: 531,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: localStyles.mainTabBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...localStyles.mainTab,
                            ...mainTab === "try" ? localStyles.mainTabActive : {}
                        },
                        onClick: ()=>setMainTab("try"),
                        children: "Try it"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 535,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...localStyles.mainTab,
                            ...mainTab === "learn" ? localStyles.mainTabActive : {}
                        },
                        onClick: ()=>setMainTab("learn"),
                        children: "How it's built"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 541,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this),
            mainTab === "try" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                        children: [
                            "Edit the customer details below and click ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Apply"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 553,
                                columnNumber: 55
                            }, this),
                            " to re-render the email. Switch to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 554,
                                columnNumber: 44
                            }, this),
                            " to see it as the customer would, or stay on ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Code"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 555,
                                columnNumber: 47
                            }, this),
                            " to see the send call with your values filled in."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 552,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: localStyles.fieldGrid,
                        children: [
                            FIELDS.map(({ key, label, wide })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        ...localStyles.field,
                                        ...wide ? localStyles.fieldWide : {}
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: localStyles.fieldLabel,
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                            lineNumber: 563,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            style: localStyles.fieldInput,
                                            value: values[key],
                                            onChange: (e)=>set(key, e.target.value),
                                            onKeyDown: (e)=>e.key === "Enter" && applyPreview(),
                                            spellCheck: false
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                            lineNumber: 564,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 562,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: localStyles.applyRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: localStyles.applyBtn,
                                        onClick: applyPreview,
                                        children: "Apply →"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 574,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: localStyles.applyHint,
                                        children: "or press Enter in any field"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 577,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: localStyles.viewer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: localStyles.viewerBar,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: localStyles.viewerDots,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.dot
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 585,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.dot
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 586,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.dot
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 587,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.viewerTitle,
                                                children: viewerTab === "preview" ? customHtml ? "Preview — custom template" : "Your payment didn't go through" : viewerTab === "template" ? "emails/billing-failure.tsx — edit & render" : "resend.emails.send(…)"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 588,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: localStyles.viewerTabs,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    ...localStyles.viewerTab,
                                                    ...viewerTab === "code" ? localStyles.viewerTabActive : {}
                                                },
                                                onClick: ()=>setViewerTab("code"),
                                                children: "Code"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 597,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    ...localStyles.viewerTab,
                                                    ...viewerTab === "template" ? localStyles.viewerTabActive : {}
                                                },
                                                onClick: ()=>setViewerTab("template"),
                                                children: "Template"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 603,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    ...localStyles.viewerTab,
                                                    ...viewerTab === "preview" ? localStyles.viewerTabActive : localStyles.viewerTabGlow
                                                },
                                                onClick: ()=>setViewerTab("preview"),
                                                children: customHtml ? "Preview ●" : "Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 609,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/api/source?file=email-template",
                                                download: "billing-failure.tsx",
                                                style: localStyles.downloadBtn,
                                                children: "↓ Download"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 618,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 596,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 583,
                                columnNumber: 13
                            }, this),
                            viewerTab === "preview" && (customHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                srcDoc: customHtml,
                                style: localStyles.frame,
                                title: "Email preview (custom)"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 630,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                src: previewUrl,
                                style: localStyles.frame,
                                title: "Email preview"
                            }, previewUrl, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 631,
                                columnNumber: 19
                            }, this)),
                            viewerTab === "code" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: localStyles.code,
                                children: buildCodeSnippet(values)
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 634,
                                columnNumber: 15
                            }, this),
                            viewerTab === "template" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative"
                                },
                                children: [
                                    templateLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: localStyles.templateLoading,
                                        children: "Loading template…"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 639,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        style: localStyles.templateTextarea,
                                        value: templateCode,
                                        onChange: (e)=>setTemplateCode(e.target.value),
                                        spellCheck: false,
                                        autoComplete: "off",
                                        autoCorrect: "off"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 641,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: localStyles.templateBar,
                                        children: [
                                            renderError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.templateError,
                                                children: renderError
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 652,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: templateApplying ? localStyles.templateApplyBtnDisabled : localStyles.templateApplyBtn,
                                                onClick: applyTemplate,
                                                disabled: templateApplying || templateLoading,
                                                children: templateApplying ? "Rendering…" : "Render preview →"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 654,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 650,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 637,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 582,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].hint,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Code"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this),
                            "— the Resend send call with your values.  ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Template"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 668,
                                columnNumber: 13
                            }, this),
                            " — edit ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "billing-failure.tsx"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 668,
                                columnNumber: 46
                            }, this),
                            " directly, paste snippets from the component library below, then click ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Render preview →"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 668,
                                columnNumber: 149
                            }, this),
                            "to see changes.  ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 669,
                                columnNumber: 13
                            }, this),
                            " — the rendered email, exactly what Resend delivers to the inbox."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 666,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: localStyles.componentLibraryHeader,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: localStyles.componentLibraryTitle,
                                    children: "React Email component library"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 675,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: localStyles.componentLibrarySubtitle,
                                    children: "Every component available to build or extend your template. Download the template and add these to customize it fully."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 676,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                            lineNumber: 674,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 673,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: localStyles.componentGrid,
                        children: COMPONENTS.map((c)=>{
                            const isExpanded = expanded === c.name;
                            const isCopied = copied === c.name;
                            const badgeStyle = BADGE_COLORS[c.badge] ?? BADGE_COLORS.text;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: localStyles.componentCard,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: localStyles.componentCardHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: localStyles.componentCardLeft,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        style: localStyles.componentTag,
                                                        children: c.tag
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            ...localStyles.componentBadge,
                                                            background: badgeStyle.bg,
                                                            color: badgeStyle.color
                                                        },
                                                        children: c.badge
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 23
                                                    }, this),
                                                    c.needsImport ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: localStyles.importBadgeNew,
                                                        children: "+ add to import"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: localStyles.importBadgeOk,
                                                        children: "already imported"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 690,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: localStyles.componentCardActions,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        style: localStyles.componentExpandBtn,
                                                        onClick: ()=>setExpanded(isExpanded ? null : c.name),
                                                        children: isExpanded ? "Hide ↑" : "See snippet ↓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 702,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        style: {
                                                            ...localStyles.componentCopyBtn,
                                                            ...isCopied ? localStyles.componentCopyBtnDone : {}
                                                        },
                                                        onClick: ()=>copy(c.name, c.snippet),
                                                        children: isCopied ? "Copied!" : "Copy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 708,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 701,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 689,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: localStyles.componentDesc,
                                        children: c.description
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 716,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: localStyles.pasteHintText,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: localStyles.pasteHintLabel,
                                                children: "↳ Where:"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 718,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            c.pasteHint
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                        lineNumber: 717,
                                        columnNumber: 19
                                    }, this),
                                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: localStyles.componentWhen,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "When to use:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 25
                                                    }, this),
                                                    " ",
                                                    c.when
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 722,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                style: localStyles.componentSnippet,
                                                children: c.snippet
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                lineNumber: 725,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, c.name, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 688,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 682,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            mainTab === "learn" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                        children: [
                            "React Email provides a set of components that abstract away the quirks of email HTML. Tables for layout, inline styles everywhere, absolute image URLs. Each component below is available in",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                                children: "@react-email/components"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                lineNumber: 742,
                                columnNumber: 13
                            }, this),
                            ". Here's what each one does, why it exists, and when to reach for it."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, this),
                    COMPONENTS.map((c, i)=>{
                        const isCopied = copied === `learn-${c.name}`;
                        const badgeStyle = BADGE_COLORS[c.badge] ?? BADGE_COLORS.text;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                ...localStyles.learnCard,
                                ...i === COMPONENTS.length - 1 ? {
                                    marginBottom: 0
                                } : {}
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: localStyles.learnCardHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: localStyles.learnCardLeft,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    style: localStyles.learnTag,
                                                    children: c.tag
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                    lineNumber: 756,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...localStyles.componentBadge,
                                                        background: badgeStyle.bg,
                                                        color: badgeStyle.color
                                                    },
                                                    children: c.badge
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                            lineNumber: 755,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            style: {
                                                ...localStyles.componentCopyBtn,
                                                ...isCopied ? localStyles.componentCopyBtnDone : {}
                                            },
                                            onClick: ()=>copy(`learn-${c.name}`, c.snippet),
                                            children: isCopied ? "Copied!" : "Copy snippet"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                            lineNumber: 761,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 754,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: localStyles.learnDesc,
                                    children: c.description
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 768,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: localStyles.componentWhen,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "When to use:"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                            lineNumber: 770,
                                            columnNumber: 19
                                        }, this),
                                        " ",
                                        c.when
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 769,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    style: localStyles.mini,
                                    children: c.snippet
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                                    lineNumber: 772,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, c.name, true, {
                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                            lineNumber: 750,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].actionsRow,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtn,
                    onClick: onComplete,
                    children: alreadyCompleted ? "Continue" : "Got it — continue"
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                    lineNumber: 780,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx",
        lineNumber: 530,
        columnNumber: 5
    }, this);
}
_s(StepTemplate, "EP06zZCyF6b1LcwQZIMj532V8Gc=");
_c = StepTemplate;
const localStyles = {
    mainTabBar: {
        display: "flex",
        gap: 2,
        borderBottom: "1px solid #e4e4e7",
        marginBottom: 24
    },
    mainTab: {
        background: "transparent",
        border: "none",
        borderBottom: "2px solid transparent",
        marginBottom: -1,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 500,
        color: "#71717a",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "color 120ms ease"
    },
    mainTabActive: {
        color: "#18181b",
        borderBottomColor: "#18181b"
    },
    fieldGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px 14px",
        background: "#f4f4f5",
        border: "1px solid #e4e4e7",
        borderRadius: 8,
        padding: "16px 18px",
        marginBottom: 14
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: 4
    },
    fieldWide: {
        gridColumn: "span 2"
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: 500,
        color: "#71717a",
        letterSpacing: "0.1px"
    },
    fieldInput: {
        fontSize: 13,
        padding: "5px 8px",
        border: "1px solid #e4e4e7",
        borderRadius: 5,
        fontFamily: "inherit",
        background: "#ffffff",
        color: "#18181b",
        width: "100%",
        boxSizing: "border-box",
        outline: "none"
    },
    applyRow: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        gridColumn: "span 3",
        paddingTop: 4
    },
    applyBtn: {
        fontSize: 13,
        fontWeight: 600,
        padding: "6px 16px",
        background: "#18181b",
        color: "#ffffff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontFamily: "inherit"
    },
    applyHint: {
        fontSize: 12,
        color: "#a1a1aa"
    },
    viewer: {
        border: "1px solid #e4e4e7",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
        background: "#fafafa"
    },
    viewerBar: {
        background: "#f4f4f5",
        borderBottom: "1px solid #e4e4e7",
        padding: "0 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 40
    },
    viewerDots: {
        display: "flex",
        alignItems: "center",
        gap: 6
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#d4d4d8",
        flexShrink: 0
    },
    viewerTitle: {
        marginLeft: 10,
        fontSize: 12,
        color: "#71717a",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace"
    },
    viewerTabs: {
        display: "flex",
        gap: 2,
        alignItems: "center"
    },
    viewerTab: {
        background: "transparent",
        border: "none",
        borderRadius: 5,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
        color: "#71717a",
        cursor: "pointer",
        fontFamily: "inherit"
    },
    viewerTabActive: {
        background: "#ffffff",
        color: "#18181b",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
    },
    viewerTabGlow: {
        background: "rgba(99,102,241,0.08)",
        color: "#6366f1",
        boxShadow: "0 0 0 1px rgba(99,102,241,0.3), 0 0 8px rgba(99,102,241,0.2)",
        borderRadius: 5
    },
    downloadBtn: {
        fontSize: 12,
        fontWeight: 500,
        color: "#3f3f46",
        textDecoration: "none",
        border: "1px solid #e4e4e7",
        borderRadius: 5,
        padding: "3px 10px",
        marginLeft: 6,
        background: "#ffffff",
        display: "inline-flex",
        alignItems: "center"
    },
    frame: {
        width: "100%",
        height: 560,
        border: "none",
        background: "#fafafa",
        display: "block"
    },
    code: {
        margin: 0,
        padding: "20px 24px",
        fontSize: 12.5,
        lineHeight: 1.65,
        color: "#e4e4e7",
        background: "#18181b",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        whiteSpace: "pre",
        display: "block",
        overflowX: "auto"
    },
    mini: {
        background: "#18181b",
        color: "#e4e4e7",
        fontSize: 12,
        lineHeight: 1.55,
        padding: "12px 16px",
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 0,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        whiteSpace: "pre",
        overflowX: "auto",
        display: "block"
    },
    // Template editor
    templateTextarea: {
        width: "100%",
        height: 560,
        padding: "16px 20px",
        margin: 0,
        background: "#18181b",
        color: "#e4e4e7",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        fontSize: 12,
        lineHeight: 1.65,
        border: "none",
        outline: "none",
        resize: "none",
        boxSizing: "border-box",
        display: "block",
        tabSize: 2
    },
    templateLoading: {
        height: 560,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        color: "#71717a",
        background: "#18181b"
    },
    templateBar: {
        padding: "10px 14px",
        background: "#27272a",
        borderTop: "1px solid #3f3f46",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        flexWrap: "wrap"
    },
    templateError: {
        flex: 1,
        fontSize: 11.5,
        color: "#f87171",
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        lineHeight: 1.5,
        wordBreak: "break-word"
    },
    templateApplyBtn: {
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 14px",
        background: "#6366f1",
        color: "#ffffff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontFamily: "inherit",
        flexShrink: 0
    },
    templateApplyBtnDisabled: {
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 14px",
        background: "#3f3f46",
        color: "#71717a",
        border: "none",
        borderRadius: 6,
        cursor: "not-allowed",
        fontFamily: "inherit",
        flexShrink: 0
    },
    // Component library (Try it tab)
    componentLibraryHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 28,
        marginBottom: 12,
        paddingTop: 24,
        borderTop: "1px solid #e4e4e7"
    },
    componentLibraryTitle: {
        fontSize: 13,
        fontWeight: 600,
        color: "#18181b",
        marginBottom: 4
    },
    componentLibrarySubtitle: {
        fontSize: 12,
        color: "#71717a",
        lineHeight: 1.5
    },
    componentGrid: {
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    componentCard: {
        border: "1px solid #e4e4e7",
        borderRadius: 8,
        padding: "12px 14px",
        background: "#fafafa"
    },
    componentCardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6
    },
    componentCardLeft: {
        display: "flex",
        alignItems: "center",
        gap: 8
    },
    componentCardActions: {
        display: "flex",
        gap: 6,
        alignItems: "center"
    },
    componentTag: {
        fontSize: 12.5,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        color: "#18181b",
        background: "#f4f4f5",
        border: "1px solid #e4e4e7",
        borderRadius: 4,
        padding: "1px 6px",
        fontWeight: 600
    },
    componentBadge: {
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 99,
        letterSpacing: "0.2px",
        textTransform: "uppercase"
    },
    componentDesc: {
        fontSize: 12.5,
        color: "#52525b",
        lineHeight: 1.65,
        margin: 0
    },
    pasteHintText: {
        fontSize: 11.5,
        color: "#71717a",
        lineHeight: 1.5,
        margin: "5px 0 0"
    },
    pasteHintLabel: {
        fontWeight: 600,
        color: "#6366f1"
    },
    importBadgeNew: {
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 99,
        background: "#fff7ed",
        color: "#c2410c",
        border: "1px solid #fed7aa",
        letterSpacing: "0.1px"
    },
    importBadgeOk: {
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 99,
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #bbf7d0",
        letterSpacing: "0.1px"
    },
    componentWhen: {
        fontSize: 12,
        color: "#71717a",
        lineHeight: 1.6,
        margin: "8px 0 0"
    },
    componentExpandBtn: {
        fontSize: 11,
        fontWeight: 500,
        color: "#71717a",
        background: "transparent",
        border: "1px solid #e4e4e7",
        borderRadius: 5,
        padding: "3px 9px",
        cursor: "pointer",
        fontFamily: "inherit"
    },
    componentCopyBtn: {
        fontSize: 11,
        fontWeight: 500,
        color: "#3f3f46",
        background: "#ffffff",
        border: "1px solid #e4e4e7",
        borderRadius: 5,
        padding: "3px 9px",
        cursor: "pointer",
        fontFamily: "inherit"
    },
    componentCopyBtnDone: {
        color: "#16a34a",
        borderColor: "#bbf7d0",
        background: "#f0fdf4"
    },
    componentSnippet: {
        background: "#18181b",
        color: "#e4e4e7",
        fontSize: 11.5,
        lineHeight: 1.6,
        padding: "12px 14px",
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 0,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        whiteSpace: "pre",
        overflowX: "auto",
        display: "block"
    },
    // How it's built tab
    learnCard: {
        border: "1px solid #e4e4e7",
        borderRadius: 8,
        padding: "16px 18px",
        marginBottom: 12,
        background: "#ffffff"
    },
    learnCardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8
    },
    learnCardLeft: {
        display: "flex",
        alignItems: "center",
        gap: 8
    },
    learnTag: {
        fontSize: 13,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        color: "#18181b",
        background: "#f4f4f5",
        border: "1px solid #e4e4e7",
        borderRadius: 5,
        padding: "2px 8px",
        fontWeight: 600
    },
    learnDesc: {
        fontSize: 13,
        color: "#3f3f46",
        lineHeight: 1.7,
        margin: "0 0 0"
    }
};
var _c;
__turbopack_context__.k.register(_c, "StepTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StepSend",
    ()=>StepSend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-styles.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function StepSend({ apiKey, fromEmail, toEmail, customerName, completed, onToEmailChange, onComplete, alreadyCompleted }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        kind: "idle"
    });
    const [mainTab, setMainTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("send");
    const allPriorComplete = completed.slice(0, 3).every(Boolean);
    const canSend = allPriorComplete && /@.+\..+/.test(toEmail.trim()) && !!fromEmail.trim() && !!apiKey.trim() && status.kind !== "sending";
    async function send() {
        setStatus({
            kind: "sending"
        });
        try {
            const res = await fetch("/api/send-billing-failure", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    apiKey,
                    from: fromEmail,
                    to: toEmail,
                    customerName
                })
            });
            const json = await res.json();
            if (!res.ok) {
                const msg = json?.error?.message || (typeof json?.error === "string" ? json.error : "Send failed.");
                setStatus({
                    kind: "error",
                    message: msg
                });
                return;
            }
            setStatus({
                kind: "success",
                id: json.id
            });
            onComplete();
        } catch (err) {
            setStatus({
                kind: "error",
                message: err.message
            });
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            alreadyCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompletedBadge"], {}, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                lineNumber: 71,
                columnNumber: 28
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: localStyles.mainTabBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...localStyles.mainTab,
                            ...mainTab === "send" ? localStyles.mainTabActive : {}
                        },
                        onClick: ()=>setMainTab("send"),
                        children: "Send"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...localStyles.mainTab,
                            ...mainTab === "learn" ? localStyles.mainTabActive : {}
                        },
                        onClick: ()=>setMainTab("learn"),
                        children: "How it's built"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            mainTab === "send" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                        children: [
                            "Enter a recipient address and click ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Send the email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 93,
                                columnNumber: 49
                            }, this),
                            ". The app will use your API key from Step 1 to authenticate with Resend, send from the address you verified in Step 2, and deliver the billing failure email with the details you set in Step 3."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].fieldGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].label,
                                        htmlFor: "from",
                                        children: "From"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "from",
                                        type: "email",
                                        value: fromEmail,
                                        readOnly: true,
                                        style: {
                                            ...__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].input,
                                            background: "#f4f4f5",
                                            color: "#71717a"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].hint,
                                        children: "Set in Step 2. Go back if you need to change it."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].label,
                                        htmlFor: "to",
                                        children: "To"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "to",
                                        type: "email",
                                        value: toEmail,
                                        onChange: (e)=>onToEmailChange(e.target.value),
                                        placeholder: "recipient@example.com",
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].input,
                                        autoComplete: "off",
                                        spellCheck: false
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].hint,
                                        children: !fromEmail || fromEmail === "onboarding@resend.dev" ? "Must be the email you signed up to Resend with (sandbox restriction)." : "Any real address. Use delivered@resend.dev for a safe test that won't land in a real inbox."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    !allPriorComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].callout,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].calloutStrong,
                                children: "Complete steps 1–3 first."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            " ",
                            "Mark each step complete using its button, then come back here to send."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 132,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].actionsRow,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: canSend ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtn : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].primaryBtnDisabled,
                            disabled: !canSend,
                            onClick: send,
                            children: status.kind === "sending" ? "Sending…" : "Send the email"
                        }, void 0, false, {
                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    status.kind === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].errorBanner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Send failed:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            " ",
                            status.message
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this),
                    status.kind === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].successBanner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "✓ Sent."
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this),
                            " Message ID:",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: {
                                    fontSize: 12
                                },
                                children: status.id
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 13
                                },
                                children: [
                                    "Check your inbox and",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://resend.com/emails",
                                        target: "_blank",
                                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].link,
                                        children: "resend.com/emails"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    "for the delivery log."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 155,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true),
            mainTab === "learn" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].prose,
                        children: [
                            "When you click Send, the browser calls a Next.js API route that uses the Resend SDK to deliver the email. The route lives at",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                                children: "app/api/send-billing-failure/route.ts"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            ". Here's exactly what it does:"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                        num: 1,
                        title: "Receive and unpack the request",
                        children: [
                            "The browser sends your API key, from address, recipient, and customer name as a JSON body. The route reads each field and falls back to environment variables if any are missing. So the app works whether the user pastes their own key in Step 1 or the deployer pre-sets one on the server.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: localStyles.code,
                                children: `const body   = await request.json();
const apiKey = body.apiKey?.trim() || process.env.RESEND_API_KEY;
const from   = body.from?.trim()   || process.env.FROM_EMAIL
                                    || "onboarding@resend.dev";
const to     = body.to?.trim();`
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                        num: 2,
                        title: "Authenticate with the Resend SDK",
                        children: [
                            "A Resend client is created using the resolved API key. This authenticates the request. Resend verifies the key against your account and allows sending from your verified domain. A new client is created per request so there's no shared state between calls.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: localStyles.code,
                                children: `import { Resend } from "resend";

const resend = new Resend(apiKey);`
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                        num: 3,
                        title: "Render the email template and send",
                        children: [
                            "The billing failure React component from Step 3 is passed directly to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                                children: "resend.emails.send()"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 208,
                                columnNumber: 16
                            }, this),
                            " via the",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                                children: "react:"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            " prop. Resend calls React Email's ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].inlineCode,
                                children: "render()"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 210,
                                columnNumber: 21
                            }, this),
                            " internally — converting the component to HTML and generating a plain-text fallback automatically. The customer details (name, amount, card, reason, retry date) are injected at send time.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: localStyles.code,
                                children: `import BillingFailureEmail from "@/emails/billing-failure";

const { data, error } = await resend.emails.send({
  from,
  to: [to],
  subject: "Your payment didn't go through",
  react: BillingFailureEmail({
    customerName,
    amount:           "29.00",
    currency:         "USD",
    cardLast4:        "4242",
    failureReason:    "Card declined (insufficient_funds).",
    nextRetryDate:    "in 3 days",
    updatePaymentUrl: "https://example.com/billing",
    supportUrl:       "https://example.com/support",
  }),
});`
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                        num: 4,
                        title: "Handle the response",
                        children: [
                            "If the send succeeds, Resend returns a unique message ID. The route passes it back to the browser, where it's shown as a confirmation. If anything goes wrong. Wrong API key, unverified domain, invalid recipient, rate limit. The error message from Resend is surfaced directly so you know exactly what to fix.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: localStyles.code,
                                children: `if (error) return Response.json({ error }, { status: 500 });
return Response.json(data);
// success: { id: "msg_xxxxxxxxxxxx" }`
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberedSection"], {
                        num: 5,
                        title: "Track the send in Resend",
                        last: true,
                        children: [
                            "Every sent email appears in the",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://resend.com/emails",
                                target: "_blank",
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$styles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepStyles"].link,
                                children: "Resend dashboard"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            " ",
                            "under Emails, searchable by message ID. The dashboard shows the delivery status (delivered, bounced, complained), the rendered HTML, and timestamps. In a production setup you'd also receive webhook events for each status change so your system can react. For example, pausing the subscription after a confirmed bounce."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(StepSend, "7x5Dqjgq38AgJC4qZtvBHxMRzp4=");
_c = StepSend;
const localStyles = {
    mainTabBar: {
        display: "flex",
        gap: 2,
        borderBottom: "1px solid #e4e4e7",
        marginBottom: 24
    },
    mainTab: {
        background: "transparent",
        border: "none",
        borderBottom: "2px solid transparent",
        marginBottom: -1,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 500,
        color: "#71717a",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "color 120ms ease"
    },
    mainTabActive: {
        color: "#18181b",
        borderBottomColor: "#18181b"
    },
    code: {
        background: "#18181b",
        color: "#e4e4e7",
        padding: "14px 16px",
        borderRadius: 7,
        fontSize: 12,
        lineHeight: 1.65,
        fontFamily: "'SF Mono', Monaco, Menlo, Consolas, monospace",
        whiteSpace: "pre",
        overflowX: "auto",
        display: "block",
        margin: "10px 0 0",
        border: "1px solid #27272a"
    }
};
var _c;
__turbopack_context__.k.register(_c, "StepSend");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Sidebar({ steps, currentStep, completed, onSelect, onHome, onReset }) {
    const completedCount = completed.filter(Boolean).length;
    const percent = Math.round(completedCount / steps.length * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: styles.sidebar,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onHome,
                style: styles.headerBtn,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.eyebrow,
                        children: "Tutorial"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: styles.title,
                        children: "Billing-failure email"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.byline,
                        children: "Next.js · React Email · Resend"
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.progress,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.progressHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.progressLabel,
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.progressPct,
                                children: [
                                    completedCount,
                                    "/",
                                    steps.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.progressBar,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                ...styles.progressFill,
                                width: `${percent}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                style: styles.list,
                children: steps.map((step, i)=>{
                    const isCompleted = completed[i];
                    const isCurrent = i === currentStep;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: styles.item,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelect(i),
                            style: {
                                ...styles.itemBtn,
                                ...isCurrent ? styles.itemBtnActive : {}
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...styles.circle,
                                        ...isCompleted ? styles.circleDone : {},
                                        ...isCurrent && !isCompleted ? styles.circleCurrent : {}
                                    },
                                    children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "10",
                                        height: "10",
                                        viewBox: "0 0 10 10",
                                        fill: "none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M2 5l2.5 2.5L8 3",
                                            stroke: "currentColor",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                            lineNumber: 66,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                        lineNumber: 65,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: styles.circleNum,
                                        children: i + 1
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                        lineNumber: 69,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: styles.itemText,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.itemTitle,
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: styles.itemDuration,
                                            children: step.duration
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                            lineNumber: 50,
                            columnNumber: 15
                        }, this)
                    }, step.id, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.footer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: styles.resetBtn,
                    onClick: onReset,
                    children: "Reset progress"
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
const styles = {
    sidebar: {
        background: "#fafafa",
        borderRight: "1px solid #e4e4e7",
        padding: "32px 20px 24px",
        width: 268,
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
    },
    headerBtn: {
        display: "block",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: "none",
        padding: "0 0 20px",
        borderBottom: "1px solid #e4e4e7",
        marginBottom: 20,
        cursor: "pointer",
        fontFamily: "inherit"
    },
    eyebrow: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.9px",
        textTransform: "uppercase",
        color: "#a1a1aa",
        marginBottom: 6
    },
    title: {
        fontSize: 15,
        fontWeight: 700,
        color: "#18181b",
        margin: "0 0 4px",
        lineHeight: 1.3,
        letterSpacing: "-0.2px"
    },
    byline: {
        fontSize: 12,
        color: "#a1a1aa",
        margin: 0,
        letterSpacing: "0.1px"
    },
    progress: {
        marginBottom: 20
    },
    progressHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 7
    },
    progressLabel: {
        fontSize: 11,
        color: "#a1a1aa",
        fontWeight: 500,
        letterSpacing: "0.2px"
    },
    progressPct: {
        fontSize: 11,
        color: "#71717a",
        fontWeight: 600
    },
    progressBar: {
        height: 3,
        background: "#e4e4e7",
        borderRadius: 99,
        overflow: "hidden"
    },
    progressFill: {
        height: "100%",
        background: "#18181b",
        borderRadius: 99,
        transition: "width 400ms ease"
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        flex: 1
    },
    item: {
        margin: 0
    },
    itemBtn: {
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        gap: 10,
        padding: "8px 10px",
        margin: "1px 0",
        background: "transparent",
        border: "none",
        borderRadius: 7,
        textAlign: "left",
        cursor: "pointer",
        transition: "background 120ms ease",
        fontFamily: "inherit"
    },
    itemBtnActive: {
        background: "#f0f0f0"
    },
    circle: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid #d4d4d8",
        color: "#a1a1aa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1
    },
    circleDone: {
        background: "#18181b",
        borderColor: "#18181b",
        color: "#ffffff"
    },
    circleCurrent: {
        borderColor: "#18181b",
        color: "#18181b"
    },
    circleNum: {
        fontSize: 11,
        fontWeight: 600,
        lineHeight: 1
    },
    itemText: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0
    },
    itemTitle: {
        fontSize: 13,
        fontWeight: 500,
        color: "#18181b",
        lineHeight: 1.4
    },
    itemDuration: {
        fontSize: 11,
        color: "#a1a1aa"
    },
    footer: {
        marginTop: 20,
        paddingTop: 16,
        borderTop: "1px solid #e4e4e7"
    },
    resetBtn: {
        background: "transparent",
        border: "none",
        color: "#a1a1aa",
        fontSize: 12,
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
        textDecoration: "underline",
        textUnderlineOffset: "2px"
    }
};
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/GitHub/billing-failure-email/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/steps.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$account$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-account.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$domain$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-domain.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$template$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-template.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$send$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/step-send.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/app/_wizard/sidebar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const STORAGE_KEY = "billing-tutorial-state-v1";
const initialState = {
    currentStep: -1,
    completed: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"].map(()=>false),
    apiKey: "",
    fromEmail: "",
    toEmail: "",
    customerName: "Alex"
};
function Home() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed.completed) && parsed.completed.length === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"].length) {
                        setState(parsed);
                    }
                }
            } catch  {
            // ignore — start fresh
            }
            setHydrated(true);
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!hydrated) return;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }["Home.useEffect"], [
        state,
        hydrated
    ]);
    function markComplete(index) {
        setState((s)=>{
            const completed = [
                ...s.completed
            ];
            completed[index] = true;
            return {
                ...s,
                completed,
                currentStep: Math.min(index + 1, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"].length - 1)
            };
        });
    }
    function goTo(index) {
        setState((s)=>({
                ...s,
                currentStep: index
            }));
    }
    function goHome() {
        setState((s)=>({
                ...s,
                currentStep: -1
            }));
    }
    function reset() {
        if (confirm("Reset the tutorial? You'll lose all progress and inputs.")) {
            localStorage.removeItem(STORAGE_KEY);
            setState(initialState);
        }
    }
    function update(key, value) {
        setState((s)=>({
                ...s,
                [key]: value
            }));
    }
    if (!hydrated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            style: styles.loadingMain,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.loadingDot
            }, void 0, false, {
                fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
            lineNumber: 91,
            columnNumber: 7
        }, this);
    }
    const current = state.currentStep;
    const isHome = current === -1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: styles.main,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: styles.shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                    steps: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"],
                    currentStep: current,
                    completed: state.completed,
                    onSelect: goTo,
                    onHome: goHome,
                    onReset: reset
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.content,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.contentInner,
                        children: isHome ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    style: styles.contentHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.stepLabel,
                                            children: "About this tutorial"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: styles.contentTitle,
                                            children: "Send a billing-failure email"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.contentSubtitle,
                                            children: "with Next.js, React Email, and Resend"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.contentBody,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.introProse,
                                            children: "This is an interactive companion tutorial on how to send a billing-failure email using Next.js, React Email and Resend. It's a full step-by-step tutorial that walks you through the entire process, from start to finish. From creating a Resend account, verifying a sending domain, building the email template, and finally sending the email, every step is covered in detail with live code and previews."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.introProse,
                                            children: [
                                                "The email template is written as a React component using React Email. The sending code runs in a Next.js App Router API route. Every step shows the actual code from the repo and a live preview of the email. You can interact with the code and preview at each step, and see how changes affect the final output in real time. The full written guide lives in the",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://github.com/ziggyedman/billing-failure-email/blob/main/README.md",
                                                    target: "_blank",
                                                    rel: "noreferrer",
                                                    style: styles.introLink,
                                                    children: "repo's README"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 19
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.introProse,
                                            children: "Use the sidebar to navigate any step at any time. Mark each one complete when you're done. Once all steps are checked, the final send form unlocks."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.videoWrapper,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                                src: "https://www.loom.com/embed/af24b2bb3e904053bb6d2c5c56a35740",
                                                allowFullScreen: true,
                                                style: styles.videoIframe
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            style: styles.startBtn,
                                            onClick: ()=>goTo(0),
                                            children: "Start with Step 1 →"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    style: styles.contentHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: styles.stepLabel,
                                            children: [
                                                "Step ",
                                                current + 1,
                                                " of ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"].length,
                                                " ·",
                                                " ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"][current].duration
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: styles.contentTitle,
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"][current].title
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: styles.contentSubtitle,
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$steps$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STEPS"][current].subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: styles.contentBody,
                                    children: [
                                        current === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$account$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepAccount"], {
                                            apiKey: state.apiKey,
                                            onApiKeyChange: (v)=>update("apiKey", v),
                                            onComplete: ()=>markComplete(0),
                                            alreadyCompleted: state.completed[0]
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this),
                                        current === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$domain$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepDomain"], {
                                            fromEmail: state.fromEmail,
                                            onFromEmailChange: (v)=>update("fromEmail", v),
                                            onComplete: ()=>markComplete(1),
                                            alreadyCompleted: state.completed[1]
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        current === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$template$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepTemplate"], {
                                            customerName: state.customerName,
                                            onCustomerNameChange: (v)=>update("customerName", v),
                                            onComplete: ()=>markComplete(2),
                                            alreadyCompleted: state.completed[2]
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this),
                                        current === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$app$2f$_wizard$2f$step$2d$send$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepSend"], {
                                            apiKey: state.apiKey,
                                            fromEmail: state.fromEmail,
                                            toEmail: state.toEmail,
                                            customerName: state.customerName,
                                            completed: state.completed,
                                            onToEmailChange: (v)=>update("toEmail", v),
                                            onComplete: ()=>markComplete(3),
                                            alreadyCompleted: state.completed[3]
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/GitHub/billing-failure-email/app/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(Home, "e3p+fluLSyrAYRslURx4BDraVvY=");
_c = Home;
const styles = {
    main: {
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "#fafafa"
    },
    shell: {
        display: "flex",
        flex: 1,
        width: "100%",
        overflow: "hidden"
    },
    content: {
        flex: 1,
        overflowY: "auto",
        background: "#ffffff",
        borderLeft: "1px solid #e4e4e7"
    },
    contentInner: {
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 48px 64px"
    },
    contentHeader: {
        borderBottom: "1px solid #e4e4e7",
        paddingBottom: 24,
        marginBottom: 32
    },
    stepLabel: {
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.7px",
        color: "#71717a",
        marginBottom: 8
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 700,
        color: "#18181b",
        margin: "0 0 6px",
        lineHeight: 1.25,
        letterSpacing: "-0.3px"
    },
    contentSubtitle: {
        fontSize: 14,
        color: "#71717a",
        margin: 0,
        lineHeight: 1.6
    },
    contentBody: {},
    introProse: {
        fontSize: 15,
        lineHeight: 1.75,
        color: "#3f3f46",
        margin: "0 0 16px"
    },
    introLink: {
        color: "#18181b",
        textDecoration: "underline",
        textUnderlineOffset: "3px"
    },
    videoWrapper: {
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        marginBottom: 24,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #e4e4e7"
    },
    videoIframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: 0
    },
    startBtn: {
        marginTop: 8,
        background: "#18181b",
        color: "#ffffff",
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "-0.1px"
    },
    loadingMain: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa"
    },
    loadingDot: {
        width: 8,
        height: 8,
        background: "#18181b",
        borderRadius: "50%",
        opacity: 0.3
    }
};
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_GitHub_billing-failure-email_app_06phivk._.js.map