/**
 * Legal page copy, taken verbatim from the live site at
 * https://sanwei-asia.com/privacy-policy/.
 *
 * "Log Data" runs on inside the Information Collection And Use section on the
 * live page; it is split out here so the two subjects are separable.
 */

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  /** Rendered after the paragraphs — the Contact Us section needs a way through. */
  cta?: { label: string; href: string };
};

export const privacyPolicy: { intro: string[]; sections: LegalSection[] } = {
  intro: [
    "Sanwei Group (“us”, “we”, or “our”) operates https://sanwei-asia.com (the “Site”). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
  ],
  sections: [
    {
      heading: "Information Collection And Use",
      paragraphs: [
        "While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name, email, contact phone number and address.",
      ],
    },
    {
      heading: "Log Data",
      paragraphs: [
        "Like many site operators, we collect information that your browser sends whenever you visit our Site (“Log Data”). This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this.",
      ],
    },
    {
      heading: "Communications",
      paragraphs: [
        "We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that keep you up-to-date with our latest offers, services and news.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer’s hard drive. Like many sites, we use “cookies” to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site. To change your cookie preferences, please click on the cookie banner in the bottom left hand corner of this site.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.",
      ],
    },
    {
      heading: "Changes To This Privacy Policy",
      paragraphs: [
        "This Privacy Policy is effective as of 1 August 2021 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: ["If you have any questions about this Privacy Policy, please contact us."],
      cta: { label: "Get in touch", href: "/contact" },
    },
  ],
};
