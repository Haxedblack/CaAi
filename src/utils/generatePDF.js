import jsPDF from 'jspdf';

export const generatePDF = (data, title) => {
  const doc = new jsPDF();
  doc.text(title, 10, 10);
  data.forEach((item, index) => doc.text(`${item.category}: ₹${item.amount}`, 10, 20 + index * 10));
  doc.save(`${title}.pdf`);
};
