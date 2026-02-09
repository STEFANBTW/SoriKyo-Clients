import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(path):
    try:
        with zipfile.ZipFile(path, 'r') as zip_ref:
            xml_content = zip_ref.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text = []
            for t in tree.findall('.//w:t', namespace):
                if t.text:
                    text.append(t.text)
            return " ".join(text)
    except Exception as e:
        return f"Error reading {path}: {e}"

folder = r"c:\Users\saade\Documents\WebDev\SoriKyo Clients\Tier 3"
output_path = r"c:\Users\saade\Documents\WebDev\SoriKyo Clients\PRG\scripts\extracted_tier3.md"
with open(output_path, "w", encoding="utf-8") as f:
    for filename in os.listdir(folder):
        if filename.endswith(".docx"):
            path = os.path.join(folder, filename)
            f.write(f"# --- {filename} ---\n\n")
            f.write(read_docx(path))
            f.write("\n\n")
print(f"Extraction complete. Saved to {output_path}")
