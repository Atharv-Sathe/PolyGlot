# PolyGlot

A simple chrome and firefox extension that allows to summarize, and translate a web pages content in different tones like Academic, Quick, and Professional.

## Instructions

### 1. Clone the repository
```powershell
git clone https://github.com/Atharv-Sathe/PolyGlot.git
```

### 2. Install the dependencies
```powershell
npm install
```

### 3. Build the extension
```powershell
npm run build
```

### 4. Load the extension in your browser
- Open the browser and go to `chrome://extensions/`
- Enable the developer mode
- Click on `Load unpacked` and select the `dist_chrome` folder

### 5. Set Browser Flags
- Go to `chrome://flags/#translation-api` to `Enabled without language pack limit`
- Go to `chrome://flags/#summarization-api-for-gemini-nano` to `Enabled`
- Go to `chrome://flags/#optimization-guide-on-device-model` to `Enables BypassPerfRequirement`

### 6. Start Using the Extension
- Open any webpage and select any text you want to translate or summarize
- Click on the PolyGlot extension icon and select the desired option


## About Summarizer Model

The summarizer model will get downloaded on your device when you use the summarizer feature for the first time. Hence, it may take some time to download the model. To check the status of the model download, visit your browser's console (`ctrl + shift + j`).

## Contact
 - Contact me at [Email](mailto:atharvsathe28704@gmail.com) for any queries or suggestions.

 - Star [this](https://github.com/Atharv-Sathe/PolyGlot) repository if you found it useful, and to stay updated on new features.

- #### Contributors
    - [Atharv Sathe](https://github.com/Atharv-Sathe)
    - [Anushree Jaiswal](https://github.com/coderKrysio)
    - [Aditya Paul](https://github.com/Paulie-Aditya)
