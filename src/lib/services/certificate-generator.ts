import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export class CertificateGenerator {
    static async generate(
        userName: string,
        quizTitle: string,
        date: Date,
        certificateCode: string
    ): Promise<string | null> {
        try {
            // Load a template or create new
            // For now, we'll create a simple certificate from scratch
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([842, 595]); // A4 Landscape
            const { width, height } = page.getSize();

            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            // Draw Background Border
            page.drawRectangle({
                x: 20,
                y: 20,
                width: width - 40,
                height: height - 40,
                borderColor: rgb(0.8, 0, 0), // Red border
                borderWidth: 5,
            });

            // Title
            page.drawText('SERTIFIKAT KOMPETENSI', {
                x: width / 2 - 200,
                y: height - 100,
                size: 30,
                font: fontBold,
                color: rgb(0.8, 0, 0),
            });

            // Subtitle
            page.drawText('Diberikan kepada:', {
                x: width / 2 - 80,
                y: height - 180,
                size: 18,
                font: font,
            });

            // User Name
            const nameWidth = fontBold.widthOfTextAtSize(userName, 40);
            page.drawText(userName, {
                x: width / 2 - nameWidth / 2,
                y: height - 240,
                size: 40,
                font: fontBold,
            });

            // Description
            const desc = `Telah berhasil menyelesaikan kuis mingguan:`;
            page.drawText(desc, {
                x: width / 2 - font.widthOfTextAtSize(desc, 18) / 2,
                y: height - 320,
                size: 18,
                font: font,
            });

            // Quiz Title
            const quizWidth = fontBold.widthOfTextAtSize(quizTitle, 24);
            page.drawText(quizTitle, {
                x: width / 2 - quizWidth / 2,
                y: height - 360,
                size: 24,
                font: fontBold,
                color: rgb(0.2, 0.2, 0.2),
            });

            // Footer
            const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            page.drawText(`Tanggal: ${dateStr}`, {
                x: 60,
                y: 60,
                size: 12,
                font: font,
            });

            page.drawText(`No. Sertifikat: ${certificateCode}`, {
                x: width - 250,
                y: 60,
                size: 12,
                font: font,
            });

            // Save
            const pdfBytes = await pdfDoc.save();
            const fileName = `CERT-${certificateCode}.pdf`;
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'certificates');

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, pdfBytes);

            return `/uploads/certificates/${fileName}`;

        } catch (error) {
            console.error('[CertificateGenerator] Error:', error);
            return null;
        }
    }
}
