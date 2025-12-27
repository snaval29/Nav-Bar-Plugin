// code.ts

// --- 1. LOCAL ICON LIBRARY (Guaranteed to work) ---
// I extracted these SVG paths specifically for your use case.
const ICONS: { [key: string]: string } = {
  // Navigation
  home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />',
  menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
  
  // Edu-Tech Specific
  courses: '<path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>', // Mortarboard/Book
  doubt: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>', // Question mark
  
  // User & Utility
  profile: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
  cart: '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
  settings: '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
};

// --- HELPER: ICON MATCHING ---
function getSvgForKeyword(keyword: string): string | null {
  const k = keyword.toLowerCase().trim().replace(/ /g, '');
  if (k.includes('home')) return ICONS['home'];
  if (k.includes('course')) return ICONS['courses']; // Matches "My Courses"
  if (k.includes('doubt') || k.includes('help')) return ICONS['doubt'];
  if (k.includes('profile') || k.includes('user')) return ICONS['profile'];
  if (k.includes('search')) return ICONS['search'];
  if (k.includes('setting')) return ICONS['settings'];
  if (k.includes('cart')) return ICONS['cart'];
  return null;
}

// --- MAIN LOGIC ---
figma.showUI(__html__, { width: 360, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-navbar') {
    const { navType, fontFamily, width, height, radius, styleSelect, sections } = msg;

    // 1. CREATE COMPONENT (Not Frame)
    const navComponent = figma.createComponent(); // <--- THIS IS THE FIX
    navComponent.name = `Nav Bar Component`;
    navComponent.resize(parseInt(width), parseInt(height));
    navComponent.cornerRadius = parseInt(radius);

    // Apply Themes
    navComponent.fills = []; navComponent.strokes = []; navComponent.effects = [];
    if (styleSelect === 'minimal') {
      navComponent.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      navComponent.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.92 } }];
      navComponent.strokeWeight = 1;
      navComponent.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.08 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }] as Effect[];
    } else if (styleSelect === 'glass') {
      navComponent.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 }, opacity: 0.25 }];
      navComponent.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.2 }];
      navComponent.effects = [{ type: "BACKGROUND_BLUR", visible: true, radius: 50 }] as Effect[];
    } else if (styleSelect === 'neobrutal') {
      navComponent.fills = [{ type: 'SOLID', color: { r: 1, g: 0.9, b: 0.4 } }]; 
      navComponent.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      navComponent.strokeWeight = 3;
    } else {
      navComponent.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.11 } }];
    }

    // Layout Props
    navComponent.layoutMode = "HORIZONTAL";
    navComponent.primaryAxisSizingMode = "FIXED";
    navComponent.counterAxisSizingMode = "FIXED";
    navComponent.primaryAxisAlignItems = "SPACE_BETWEEN"; 
    navComponent.counterAxisAlignItems = "CENTER";
    navComponent.paddingLeft = 32; navComponent.paddingRight = 32;

    // Load Fonts
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    try {
        await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
        await figma.loadFontAsync({ family: fontFamily, style: "Medium" });
    } catch(e) {}

    // Colors
    let textColor = { r: 0.2, g: 0.2, b: 0.2 };
    let iconColor = { r: 0.4, g: 0.4, b: 0.4 };
    let activeColor = { r: 0.09, g: 0.63, b: 1 };
    if (styleSelect === 'dark') { textColor = {r:1,g:1,b:1}; iconColor = {r:0.8,g:0.8,b:0.8}; activeColor = {r:1,g:1,b:1}; }
    if (styleSelect === 'neobrutal') { textColor = {r:0,g:0,b:0}; iconColor = {r:0,g:0,b:0}; activeColor = {r:0,g:0,b:0}; }

    // Generate Items
    for (let i = 0; i < sections.length; i++) {
      const name = sections[i].trim();
      
      const itemFrame = figma.createFrame();
      itemFrame.name = name;
      itemFrame.layoutMode = navType === 'mobile' ? "VERTICAL" : "HORIZONTAL";
      itemFrame.primaryAxisAlignItems = "CENTER";
      itemFrame.counterAxisAlignItems = "CENTER";
      itemFrame.itemSpacing = 6;
      itemFrame.fills = [];

      // ICON
      const iconBox = figma.createFrame();
      iconBox.resize(24, 24);
      iconBox.backgrounds = [];
      if(styleSelect === 'neobrutal') {
         iconBox.strokes = [{type:'SOLID', color:{r:0,g:0,b:0}}];
         iconBox.strokeWeight = 2;
      }

      const svgPath = getSvgForKeyword(name);
      if (svgPath) {
        const svgNode = figma.createNodeFromSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath.match(/d="([^"]+)"/)?.[1]}" fill="black"/></svg>`);
        svgNode.resize(24, 24);
        svgNode.findAll(n => n.type === 'VECTOR').forEach(v => {
            (v as VectorNode).fills = [{ type: 'SOLID', color: iconColor }];
        });
        iconBox.appendChild(svgNode);
      } else {
        const c = figma.createEllipse();
        c.resize(24, 24);
        c.fills = [{ type: 'SOLID', color: iconColor }];
        iconBox.appendChild(c);
      }

      // LABEL
      const label = figma.createText();
      label.characters = name;
      label.fontSize = 12;
      label.fills = [{ type: 'SOLID', color: textColor }];
      try { label.fontName = { family: fontFamily, style: "Regular" }; } catch(e) { label.fontName = { family: "Inter", style: "Regular" }; }

      // Active State (First Item)
      if (i === 0) {
        try { label.fontName = { family: fontFamily, style: "Medium" }; } catch(e) {}
        
        // Recolor Icon (Manual Safe Mode)
        if (iconBox.children.length > 0) {
            const child = iconBox.children[0];
            if (child.type === 'FRAME') { // SVG
                child.findAll(n => n.type === 'VECTOR').forEach(v => {
                    (v as VectorNode).fills = [{ type: 'SOLID', color: activeColor }];
                });
            } else if (child.type === 'ELLIPSE') {
                (child as EllipseNode).fills = [{ type: 'SOLID', color: activeColor }];
            }
        }
      }

      itemFrame.appendChild(iconBox);
      itemFrame.appendChild(label);
      navComponent.appendChild(itemFrame);
    }

    figma.currentPage.selection = [navComponent];
    figma.viewport.scrollAndZoomIntoView([navComponent]);
    figma.closePlugin();
  }
};