// code.ts

// --- 1. ICON DICTIONARY (SVG Paths) ---
const ICONS: { [key: string]: string } = {
  home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />',
  search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>',
  profile: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  user: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
  settings: '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>',
  cart: '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>',
  courses: '<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>',
  menu: '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
  heart: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'
};

// --- 2. THEME-AWARE ICON GENERATOR ---
function createIconNode(keyword: string, color: RGB, theme: string): FrameNode {
  // Extract key (e.g., "My Profile" -> "profile")
  const key = keyword.toLowerCase().trim().split(' ').pop() || '';
  const svgPath = ICONS[key];
  
  const iconFrame = figma.createFrame();
  iconFrame.resize(24, 24);
  iconFrame.backgrounds = []; 
  
  // Theme Adaptation Logic for Icons
  if (theme === 'neobrutal') {
    // Neo-Brutal Icons: Sharp corners, Black border around container
    iconFrame.cornerRadius = 0;
    iconFrame.strokes = [{ type: 'SOLID', color: {r:0, g:0, b:0} }];
    iconFrame.strokeWeight = 2; // Thick stroke
  } else {
    iconFrame.cornerRadius = 0; // Default
  }

  if (svgPath) {
    const fullSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath.match(/d="([^"]+)"/)?.[1]}" fill="black"/></svg>`;
    const node = figma.createNodeFromSvg(fullSvg);
    node.resize(24, 24);
    
    // Recolor the vector
    node.children.forEach(child => {
      if(child.type === 'VECTOR') {
        child.fills = [{ type: 'SOLID', color: color }];
      }
    });

    iconFrame.appendChild(node);
    node.x = 0; node.y = 0;
  } else {
    // Fallback: Circle
    const circle = figma.createEllipse();
    circle.resize(24, 24);
    
    if (theme === 'neobrutal') {
      // Neo-brutal fallback: Square with thick border
      const rect = figma.createRectangle();
      rect.resize(24, 24);
      rect.fills = [{ type: 'SOLID', color: color }];
      rect.strokes = [{ type: 'SOLID', color: {r:0,g:0,b:0} }];
      rect.strokeWeight = 2;
      iconFrame.appendChild(rect);
    } else {
      circle.fills = [{ type: 'SOLID', color: color }];
      iconFrame.appendChild(circle);
    }
  }

  return iconFrame;
}

// --- 3. APPLY CONTAINER THEME ---
function applyTheme(frame: FrameNode, styleName: string) {
  frame.fills = []; frame.strokes = []; frame.effects = [];

  switch (styleName) {
    case 'minimal':
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      frame.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.92 } }];
      frame.strokeWeight = 1;
      frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.08 }, offset: { x: 0, y: 4 }, radius: 12, visible: true, blendMode: "NORMAL" }] as Effect[];
      break;

    case 'glass':
      // Apple Style: 25% opacity, blur 50, hairline border
      frame.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.98 }, opacity: 0.25 }];
      frame.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: 0.2 }];
      frame.strokeWeight = 0.5;
      frame.effects = [{ type: "BACKGROUND_BLUR", visible: true, radius: 50 }] as Effect[];
      break;

    case 'neobrutal':
      // Yellow background, hard black border, hard shadow
      frame.fills = [{ type: 'SOLID', color: { r: 1, g: 0.9, b: 0.4 } }]; 
      frame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      frame.strokeWeight = 3;
      frame.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 1 }, offset: { x: 4, y: 4 }, radius: 0, visible: true, blendMode: "NORMAL" }] as Effect[];
      break;

    case 'dark':
      frame.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.11 } }];
      frame.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
      frame.strokeWeight = 1;
      break;
  }
}

// --- MAIN LOGIC ---

figma.showUI(__html__, { width: 360, height: 550 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-navbar') {
    const { navType, fontFamily, width, height, radius, sections, styleSelect } = msg;

    const navFrame = figma.createFrame();
    navFrame.name = `Nav Bar (${styleSelect})`;
    navFrame.resize(parseInt(width), parseInt(height));
    navFrame.cornerRadius = parseInt(radius);

    applyTheme(navFrame, styleSelect);

    navFrame.layoutMode = "HORIZONTAL";
    navFrame.primaryAxisSizingMode = "FIXED";
    navFrame.counterAxisSizingMode = "FIXED";
    navFrame.primaryAxisAlignItems = "SPACE_BETWEEN"; 
    navFrame.counterAxisAlignItems = "CENTER";
    navFrame.paddingLeft = 32; navFrame.paddingRight = 32;

    // Font Handling
    // Try to load user font, fallback to Inter if it fails (safety check)
    try {
      await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
      await figma.loadFontAsync({ family: fontFamily, style: "Medium" });
      await figma.loadFontAsync({ family: fontFamily, style: "Bold" }); // For Neo-brutal
    } catch (e) {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    }

    const items = sections.split(',').map((s: string) => s.trim());
    
    // --- COLOR LOGIC ---
    let textColor = { r: 0.2, g: 0.2, b: 0.2 };
    let iconColor = { r: 0.4, g: 0.4, b: 0.4 };
    let activeColor = { r: 0.09, g: 0.63, b: 1 }; // Default Blue

    if (styleSelect === 'dark') {
      textColor = { r: 1, g: 1, b: 1 };
      iconColor = { r: 0.8, g: 0.8, b: 0.8 };
      activeColor = { r: 1, g: 1, b: 1 }; // White active
    } else if (styleSelect === 'neobrutal') {
      textColor = { r: 0, g: 0, b: 0 };
      iconColor = { r: 0, g: 0, b: 0 }; // Pitch black icons
      activeColor = { r: 0, g: 0, b: 0 }; // Pitch black active
    }

    // --- ITEM CREATION LOOP ---
    for (const itemText of items) {
      const itemFrame = figma.createFrame();
      itemFrame.name = itemText;
      itemFrame.layoutMode = navType === 'mobile' ? "VERTICAL" : "HORIZONTAL";
      itemFrame.primaryAxisAlignItems = "CENTER";
      itemFrame.counterAxisAlignItems = "CENTER";
      itemFrame.itemSpacing = navType === 'mobile' ? 4 : 8; 
      itemFrame.fills = [];

      // Create Icon with Theme Logic
      const iconNode = createIconNode(itemText, iconColor, styleSelect);
      
      const label = figma.createText();
      label.fontName = { family: fontFamily, style: "Regular" };
      label.characters = itemText;
      label.fontSize = navType === 'mobile' ? 10 : 14;
      label.fills = [{ type: 'SOLID', color: textColor }];

      // Active State Logic (Highlight first item)
      if (items.indexOf(itemText) === 0) {
          // Make text Bold
          label.fontName = { family: fontFamily, style: styleSelect === 'neobrutal' ? "Bold" : "Medium" };
          
          // Color Icon Children
          if(iconNode.children[0] && "fills" in iconNode.children[0]){
               // @ts-ignore
               iconNode.children[0].fills = [{ type: 'SOLID', color: activeColor }];
          }
          
          // For Neo-Brutal, maybe fill the box?
          if (styleSelect === 'neobrutal') {
             iconNode.fills = [{ type: 'SOLID', color: {r:1, g:1, b:1} }]; // White background for active
          }
      }

      itemFrame.appendChild(iconNode);
      itemFrame.appendChild(label);
      navFrame.appendChild(itemFrame);
    }

    figma.currentPage.selection = [navFrame];
    figma.viewport.scrollAndZoomIntoView([navFrame]);
  }
};