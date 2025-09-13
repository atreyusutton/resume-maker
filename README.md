# Dynamic Resume Builder

A powerful, interactive resume builder with drag-and-drop functionality, real-time preview, and PDF export capabilities.

## Features

### 🎯 Core Functionality
- **Drag & Drop Reordering**: Rearrange resume sections by dragging them up or down
- **Include/Exclude Toggles**: Use checkboxes to include or exclude entire sections or individual items
- **Live Preview**: See your resume update in real-time as you make changes
- **PDF Export**: Download your resume as a high-quality PDF

### ✨ Rich Text Support
- **Bold and Italic**: Format text with bold and italic styling
- **Embedded Links**: Add clickable links within text content
- **Rich Text Editor**: User-friendly editor with formatting toolbar

### 📋 Resume Sections

1. **Personal Information**
   - Full name (displayed prominently)
   - Contact details (location, email, phone)
   - Professional links (LinkedIn, GitHub, personal site, business site)

2. **Objective**
   - Job title (for reference only, not shown on resume)
   - Career objective paragraph

3. **Experience**
   - Job title, company, and optional company website link
   - Start/end dates and location
   - Bullet points with rich text support (can include links)
   - Individual toggles for each experience and bullet point

4. **Skills**
   - Organized by categories (Technical, Creative, Professional, etc.)
   - Comma-separated skill lists
   - Toggle individual skill categories

5. **Education**
   - School/institution name
   - Degree/program details
   - Dates and location
   - Optional GPA field

6. **Projects**
   - Project title and description with rich text
   - Skills used (comma-separated)
   - Toggle individual projects

7. **Other/Additional Information**
   - Custom sections for certifications, awards, languages, etc.
   - Rich text content support
   - Flexible title and content fields

## How It Works

### Layout
The application uses a **split-screen layout**:
- **Left Side**: Interactive editor with all resume sections
- **Right Side**: Live preview showing how the resume will look

### Editing Process
1. **Section Management**: Each section has a checkbox to include/exclude it from the final resume
2. **Drag & Drop**: Use the grip handle (⋮⋮) to drag sections to reorder them
3. **Individual Items**: Within sections like Experience and Skills, each item can be individually enabled/disabled
4. **Rich Text**: Use the formatting toolbar to add bold, italic, and links to text content

### Data Structure
The app maintains a structured data model where each section has:
- `id`: Unique identifier
- `type`: Section type (personal, experience, etc.)
- `enabled`: Whether the section is included
- `order`: Display order (managed by drag & drop)
- `data`: Section-specific content

### Export Functionality
- **PDF Generation**: Converts the preview into a high-quality PDF
- **Filename**: Automatically uses your name for the PDF filename
- **Styling**: Maintains professional formatting in the exported PDF

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Navigate to the project directory:
   ```bash
   cd "resume maker"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:3000`

### Usage Tips

1. **Start with Personal Info**: Fill out your basic contact information first
2. **Add Content Gradually**: Work through each section, adding and organizing content
3. **Use Rich Text Features**: 
   - Select text and use the formatting toolbar for bold/italic
   - Highlight text and click the link button to add URLs
4. **Organize with Drag & Drop**: Reorder sections to match your preferred resume structure
5. **Toggle Sections**: Disable sections you don't need for specific job applications
6. **Preview Frequently**: Check the right panel to see how your resume looks
7. **Export When Ready**: Click "Export PDF" to download your finished resume

### Customization

The app comes pre-loaded with your information but can be easily customized:
- All text fields are editable
- Add/remove experience entries, skills categories, education items, etc.
- Reorder sections to match your preferences
- Toggle sections on/off for different job applications

### Technical Details

**Built With**:
- React 18 with functional components and hooks
- React DnD for drag-and-drop functionality
- Styled Components for styling
- React Quill for rich text editing
- jsPDF and html2canvas for PDF generation
- UUID for unique identifiers

**Key Components**:
- `App.js`: Main application container with state management
- `EditorPanel.js`: Left side editor interface
- `PreviewPanel.js`: Right side resume preview
- `DraggableSection.js`: Handles drag & drop for sections
- Individual editors for each section type
- `RichTextEditor.js`: Wrapper for rich text editing

The application is designed to be responsive and user-friendly, with a modern interface that makes resume building intuitive and efficient.
