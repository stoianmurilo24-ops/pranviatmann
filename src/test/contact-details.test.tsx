import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Index } from "@/routes/index";

// Contact details are business facts Murilo supplied: the WhatsApp number, the
// Instagram handle and the footer year must never drift back to placeholders.
describe("Contact details", () => {
  it("points every WhatsApp button to +55 13 99115-8252", () => {
    render(<Index />);

    const links = screen
      .getAllByText("Falar no WhatsApp")
      .map((el) => el.closest("a"))
      .filter((a): a is HTMLAnchorElement => a !== null);

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link.href).toBe("https://wa.me/5513991158252");
  });

  it("links the Instagram icon to @pranviatmann and drops YouTube", () => {
    render(<Index />);

    const instagram = screen.getByLabelText("Instagram") as HTMLAnchorElement;
    expect(instagram.href).toBe("https://www.instagram.com/pranviatmann");
    expect(screen.queryByLabelText("YouTube")).toBeNull();
  });

  it("shows 2026 in the footer", () => {
    render(<Index />);

    const footer = screen.getByText(/Todos os direitos reservados/);
    expect(footer.textContent).toContain("2026");
    expect(footer.textContent).not.toContain("2025");
  });
});
