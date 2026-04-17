export interface StepDef {
  id: string;
  title: string;
  subtitle: string;
  /** How long this step realistically takes */
  duration: string;
  /** Whether the "Mark complete" button is gated by user input */
  requiresInput?: boolean;
}

export const STEPS: StepDef[] = [
  {
    id: "account",
    title: "Create a Resend account",
    subtitle: "Sign up and grab an API key",
    duration: "~2 min",
    requiresInput: true, // requires pasting the key
  },
  {
    id: "domain",
    title: "Verify your sending domain",
    subtitle: "Add DNS records so you can send from your own address",
    duration: "~10 min",
  },
  {
    id: "template",
    title: "Understand the email template",
    subtitle: "React Email components that render the billing failure email",
    duration: "~3 min",
  },
  {
    id: "preview",
    title: "Preview the email",
    subtitle: "See exactly what the recipient will see",
    duration: "~1 min",
  },
  {
    id: "send",
    title: "Send it",
    subtitle: "Fill in from and to, then fire the request",
    duration: "~1 min",
    requiresInput: true, // requires actually sending
  },
];
