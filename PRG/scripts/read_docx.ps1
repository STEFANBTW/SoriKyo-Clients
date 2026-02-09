Add-Type -AssemblyName System.IO.Compression

function Read-DocxText {
    param([string]$path)
    try {
        $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
        $entry = $zip.GetEntry("word/document.xml")
        if ($null -ne $entry) {
            $stream = $entry.Open()
            $reader = New-Object System.IO.StreamReader($stream)
            $xml = $reader.ReadToEnd()
            $reader.Close()
            $stream.Close()
            $zip.Dispose()
            
            # Simple regex to extract text from XML tags
            # Matches <w:t>...</w:t> tags which contain the actual text
            $matches = [regex]::Matches($xml, '<w:t[^>]*>(.*?)</w:t>')
            $text = ($matches | ForEach-Object { $_.Groups[1].Value }) -join " "
            return $text
        }
    }
    catch {
        Write-Error "Failed to read $path: $_"
    }
    finally {
        if ($null -ne $zip) { $zip.Dispose() }
    }
}

$files = Get-ChildItem 'c:\Users\saade\Documents\WebDev\SoriKyo Clients\Tier 3\*.docx'
foreach ($file in $files) {
    Write-Host "--- $($file.Name) ---"
    Read-DocxText $file.FullName
    Write-Host "`n"
}
