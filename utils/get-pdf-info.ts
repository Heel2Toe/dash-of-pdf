
export default function getPdfInfo(url: string){

    const urlObj = new URL(url);
    const pathName = urlObj.pathname;
    const sections = pathName.split('/');
    const fullName = sections[sections.length-1];
    const pdfId = fullName.slice(0,-4);
    const pdfName = fullName.slice(0,-11);

    return { pdfId , pdfName}
}