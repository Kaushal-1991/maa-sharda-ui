import { ActionIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import jsPDF from "jspdf";

interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber?: string;
  registrationStatus: string;
}

interface RegistrationCertificateProps {
  student: Student;
}

const RegistrationCertificate = ({ student }: RegistrationCertificateProps) => {
  const downloadRegistrationPdf = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // =====================================================
    // COLORS
    // =====================================================

    const NAVY = [15, 45, 78];
    const BLUE = [37, 99, 235];
    const GOLD = [202, 138, 4];
    const GREEN = [22, 163, 74];

    const DARK = [51, 65, 85];
    const GRAY = [100, 116, 139];

    const LIGHT_BLUE = [239, 246, 255];
    const LIGHT_GREEN = [240, 253, 244];
    const LIGHT_GRAY = [248, 250, 252];

    // =====================================================
    // HELPER FUNCTIONS
    // =====================================================

    const setText = (
      color: number[],
      size: number,
      font: "normal" | "bold" = "normal",
    ) => {
      doc.setTextColor(color[0], color[1], color[2]);

      doc.setFont("helvetica", font);

      doc.setFontSize(size);
    };

    const centerText = (
      text: string,
      y: number,
      size: number,
      color: number[],
      font: "normal" | "bold" = "normal",
    ) => {
      setText(color, size, font);

      doc.text(text, pageWidth / 2, y, {
        align: "center",
      });
    };

    const roundedBox = (
      x: number,
      y: number,
      width: number,
      height: number,
      color: number[],
      radius = 3,
    ) => {
      doc.setFillColor(color[0], color[1], color[2]);

      doc.roundedRect(x, y, width, height, radius, radius, "F");
    };

    // =====================================================
    // BACKGROUND
    // =====================================================

    doc.setFillColor(255, 255, 255);

    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // =====================================================
    // OUTER BORDER
    // =====================================================

    doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);

    doc.setLineWidth(1.3);

    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    // =====================================================
    // GOLD BORDER
    // =====================================================

    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);

    doc.setLineWidth(0.6);

    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

    // =====================================================
    // INNER BLUE BORDER
    // =====================================================

    doc.setDrawColor(BLUE[0], BLUE[1], BLUE[2]);

    doc.setLineWidth(0.25);

    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // =====================================================
    // DECORATIVE CORNERS
    // =====================================================

    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);

    doc.setLineWidth(0.9);

    // Top Left

    doc.line(15, 25, 15, 15);

    doc.line(15, 15, 25, 15);

    // Top Right

    doc.line(pageWidth - 15, 15, pageWidth - 15, 25);

    doc.line(pageWidth - 15, 15, pageWidth - 25, 15);

    // Bottom Left

    doc.line(15, pageHeight - 15, 15, pageHeight - 25);

    doc.line(15, pageHeight - 15, 25, pageHeight - 15);

    // Bottom Right

    doc.line(pageWidth - 15, pageHeight - 15, pageWidth - 15, pageHeight - 25);

    doc.line(pageWidth - 15, pageHeight - 15, pageWidth - 25, pageHeight - 15);

    // =====================================================
    // LOGO
    // =====================================================

    try {
      doc.addImage("/maa-sharda.png", "PNG", pageWidth / 2 - 15, 20, 30, 30);
    } catch (error) {
      console.error("Logo could not be loaded", error);

      // Fallback

      doc.setFillColor(LIGHT_BLUE[0], LIGHT_BLUE[1], LIGHT_BLUE[2]);

      doc.circle(pageWidth / 2, 35, 14, "F");

      centerText("MSA", 39, 10, NAVY, "bold");
    }

    // =====================================================
    // ACADEMY NAME
    // =====================================================

    centerText("MAA SHARDA ACADEMY", 59, 21, NAVY, "bold");

    centerText("LEARN • GROW • ACHIEVE", 66, 8, GOLD, "bold");

    // =====================================================
    // HEADER LINE
    // =====================================================

    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);

    doc.setLineWidth(0.7);

    doc.line(35, 73, pageWidth - 35, 73);

    // =====================================================
    // OFFICIAL CERTIFICATE
    // =====================================================

    centerText("OFFICIAL CERTIFICATE", 83, 8, GRAY, "bold");

    // =====================================================
    // DECORATIVE TITLE LINES
    // =====================================================

    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);

    doc.setLineWidth(0.6);

    doc.line(30, 90, 63, 90);

    doc.line(pageWidth - 63, 90, pageWidth - 30, 90);

    // =====================================================
    // MAIN TITLE
    // =====================================================

    centerText("REGISTRATION CERTIFICATE", 96, 18, NAVY, "bold");

    // =====================================================
    // SUCCESS BOX
    // =====================================================

    const successX = 30;
    const successY = 105;
    const successWidth = pageWidth - 60;
    const successHeight = 27;

    roundedBox(successX, successY, successWidth, successHeight, LIGHT_GREEN, 4);

    doc.setDrawColor(GREEN[0], GREEN[1], GREEN[2]);

    doc.setLineWidth(0.6);

    doc.roundedRect(successX, successY, successWidth, successHeight, 4, 4, "S");

    centerText("REGISTRATION COMPLETED", 116, 11, GREEN, "bold");

    centerText(
      "Your registration with Maa Sharda Academy has been successfully completed.",
      125,
      8.5,
      DARK,
    );

    // =====================================================
    // STUDENT INFORMATION HEADING
    // =====================================================

    setText(NAVY, 12, "bold");

    doc.text("STUDENT INFORMATION", 30, 144);

    doc.setDrawColor(BLUE[0], BLUE[1], BLUE[2]);

    doc.setLineWidth(0.5);

    doc.line(30, 149, pageWidth - 30, 149);

    // =====================================================
    // STUDENT INFORMATION CARD
    // =====================================================

    const cardX = 30;
    const cardY = 155;
    const cardWidth = pageWidth - 60;
    const cardHeight = 63;

    roundedBox(cardX, cardY, cardWidth, cardHeight, LIGHT_GRAY, 4);

    // =====================================================
    // STUDENT NAME
    // =====================================================

    setText(GRAY, 8, "bold");

    doc.text("STUDENT NAME", 40, 168);

    setText(DARK, 12, "bold");

    doc.text(student.name || "-", 40, 178);

    // =====================================================
    // EMAIL
    // =====================================================

    setText(GRAY, 8, "bold");

    doc.text("EMAIL ADDRESS", 40, 191);

    setText(DARK, 9.5, "normal");

    const emailLines = doc.splitTextToSize(student.email || "-", 62);

    doc.text(emailLines, 40, 201);

    // =====================================================
    // REGISTRATION NUMBER
    // =====================================================

    const rightX = 112;
    const rightWidth = 77;

    roundedBox(rightX, 163, rightWidth, 23, LIGHT_BLUE, 4);

    setText(BLUE, 7, "bold");

    doc.text("REGISTRATION NUMBER", rightX + rightWidth / 2, 171, {
      align: "center",
    });

    setText(NAVY, 11, "bold");

    doc.text(student.registrationNumber || "-", rightX + rightWidth / 2, 180, {
      align: "center",
    });

    // =====================================================
    // REGISTRATION STATUS
    // =====================================================

    roundedBox(rightX, 191, rightWidth, 23, LIGHT_GREEN, 4);

    setText(GRAY, 7, "bold");

    doc.text("REGISTRATION STATUS", rightX + rightWidth / 2, 199, {
      align: "center",
    });

    setText(GREEN, 10, "bold");

    doc.text("COMPLETED", rightX + rightWidth / 2, 208, {
      align: "center",
    });

    // =====================================================
    // CONFIRMATION
    // =====================================================

    centerText("CONFIRMATION", 236, 9, GOLD, "bold");

    const message =
      "We are pleased to confirm that your registration with Maa Sharda Academy has been successfully completed. This certificate serves as an official confirmation of your registration. We welcome you and wish you a successful learning journey.";

    const messageLines = doc.splitTextToSize(message, pageWidth - 65);

    setText(DARK, 9.5, "normal");

    doc.text(messageLines, pageWidth / 2, 247, {
      align: "center",
      lineHeightFactor: 1.45,
    });

    // =====================================================
    // DATE OF REGISTRATION
    // =====================================================

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    setText(GRAY, 7.5, "bold");

    doc.text("DATE OF REGISTRATION", 32, 264);

    setText(DARK, 9, "normal");

    doc.text(formattedDate, 32, 272);

    // =====================================================
    // SIGNATURE
    // =====================================================

    try {
      doc.addImage("/tushar-signature.png", "PNG", pageWidth - 78, 258, 42, 17);
    } catch (error) {
      console.error("Signature could not be loaded", error);
    }

    // =====================================================
    // SIGNATURE LINE
    // =====================================================

    doc.setDrawColor(DARK[0], DARK[1], DARK[2]);

    doc.setLineWidth(0.4);

    doc.line(pageWidth - 82, 270, pageWidth - 32, 270);

    // =====================================================
    // SIGNATORY NAME
    // =====================================================

    // setText(DARK, 8, "bold");

    // doc.text("Tushar", pageWidth - 57, 276, {
    //   align: "center",
    // });

    // =====================================================
    // AUTHORIZED SIGNATORY
    // =====================================================

    setText(GRAY, 6.5, "normal");

    doc.text("Authorized Signatory", pageWidth - 57, 278, {
      align: "center",
    });

    // =====================================================
    // FOOTER LINE
    // =====================================================

    doc.setDrawColor(BLUE[0], BLUE[1], BLUE[2]);

    doc.setLineWidth(0.35);

    doc.line(30, 284, pageWidth - 30, 284);

    // =====================================================
    // FOOTER TEXT
    // =====================================================

    setText(NAVY, 7, "bold");

    doc.text("MAA SHARDA ACADEMY", pageWidth / 2, 288, {
      align: "center",
    });

    // =====================================================
    // DOWNLOAD FILE
    // =====================================================

    const safeName = student.name
      ? student.name.replace(/[^a-zA-Z0-9]/g, "_").replace(/_+/g, "_")
      : "Student";

    const registrationNo = student.registrationNumber
      ? `_${student.registrationNumber}`
      : "";

    doc.save(`Maa_Sharda_Registration${registrationNo}_${safeName}.pdf`);
  };

  // =====================================================
  // DOWNLOAD BUTTON
  // =====================================================

  return (
    <Tooltip label="Download Registration Certificate">
      <ActionIcon
        size={32}
        color="green"
        variant="light"
        onClick={downloadRegistrationPdf}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";

          e.currentTarget.style.boxShadow = "0 5px 12px rgba(22,163,74,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";

          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
        }}
      >
        <IconDownload size={17} stroke={1.8} />
      </ActionIcon>
    </Tooltip>
  );
};

export default RegistrationCertificate;
