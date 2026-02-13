
def get_tool_info(tool_name):
    """
    Returns a dictionary with 'icon' (URL or SVG) and 'color' (hex) for a given tool name.
    """
    name_lower = tool_name.lower()
    
    # Default fallback - NO ICON for unknown tools as requested
    default_icon = None
    default_color = "#6c757d" # Grey

    # Mapping Logic
    
    if "n8n" in name_lower:
        # Using LobeHub n8n color icon as requested by user
        return {
            "icon": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/n8n-color.svg",
            "color": "#ea4b71" # n8n Red
        }
    
    if "openrouter" in name_lower:
        # Using LobeHub OpenRouter icon as requested by user
        return {
             "icon": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openrouter.svg", 
             "color": "#635bff"
        }

    if "deepseek" in name_lower:
        return {
            "icon": "https://avatars.githubusercontent.com/u/108931320?s=200&v=4", # DeepSeek GitHub Avatar
            "color": "#4361ee" 
        }

    if "python" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "color": "#3776ab"
        }
        
    if "sheets" in name_lower or "spreadsheet" in name_lower:
        return {
            "icon": "/static/images/icons/google_sheets.svg",
            "color": "#34a853"
        }

    if "excel" in name_lower:
        return {
            "icon": "https://upload.wikimedia.org/wikipedia/commons/7/73/Microsoft_Excel_2013-2019_logo.svg", # Official Excel
            "color": "#217346"
        }
        
    if "chatgpt" in name_lower or "gpt" in name_lower or "openai" in name_lower:
        return {
            "icon": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
            "color": "#74aa9c"
        }

    if "gemini" in name_lower:
        return {
            "icon": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
            "color": "#8e44ef"
        }

    if "antigravity" in name_lower:
        return {
            "icon": "/static/images/icons/Google_Antigravity-logo_brandlogos.net_e23c83.svg",
            "color": "#4285f4"
        }

    if "javascript" in name_lower or "apps script" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "color": "#f7df1e"
        }
    
    if "html" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "color": "#e34f26"
        }
        
    if "css" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "color": "#1572b6"
        }
        
    if "webhooks" in name_lower or "api" in name_lower:
        return {
            "icon": "https://www.svgrepo.com/show/331307/api.svg", 
            "color": "#007bff"
        }

    if "http" in name_lower:
        # Explicitly disabling icon for HTTP Requests as requested (only specific ones should have icons)
        return {
            "icon": None,
            "color": "#007bff"
        }
        
    if "json" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
            "color": "#000000"
        }
        
    if "pandas" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
            "color": "#150458"
        }
        
    if "numpy" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
            "color": "#013243"
        }
        
    if "matplotlib" in name_lower:
        return {
            "icon": "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
            "color": "#ffffff" 
        }
        
    if "seaborn" in name_lower:
        return {
            "icon": "https://seaborn.pydata.org/_static/logo-mark-lightbg.svg",
            "color": "#4c72b0"
        }

    if "github" in name_lower or "git" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
            "color": "#181717"
        }
        
    if "flask" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
            "color": "#000000"
        }

    if "docker" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "color": "#2496ed"
        }
        
    if "mysql" in name_lower or "sql" in name_lower:
        return {
            "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            "color": "#4479a1"
        }

    # Miscellaneous Logic / Fallbacks
    if "base44" in name_lower:
         return {
            "icon": "/static/images/icons/base44.png?v=2", 
            "color": "#6c5ce7"
        }

    if "power query" in name_lower:
        return {
            "icon": "https://upload.wikimedia.org/wikipedia/commons/7/73/Microsoft_Excel_2013-2019_logo.svg",
            "color": "#217346"
        }
    
    if "vba" in name_lower:
        return {
            "icon": "https://upload.wikimedia.org/wikipedia/commons/7/73/Microsoft_Excel_2013-2019_logo.svg",
            "color": "#217346"
        }

    # If no match found
    return {
        "icon": None,
        "color": default_color
    }

def get_tools_with_icons(tool_list):
    results = []
    for tool in tool_list:
        info = get_tool_info(tool)
        results.append({
            "name": tool,
            "icon": info["icon"],
            "color": info["color"]
        })
    return results

def get_all_tools_with_icons():
    """Returns a curated list of all tools that have icons, for the homepage showcase."""
    showcase_tools = [
        "n8n",
        "OpenRouter",
        "DeepSeek",
        "Python",
        "Google Sheets",
        "Excel",
        "ChatGPT",
        "JavaScript",
        "HTML",
        "CSS",
        "Flask",
        "MySQL",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "GitHub",
        "Base44",
        "Power Query",
        "VBA",
        "Gemini",
        "Antigravity",
        "Docker",
    ]
    results = []
    for tool in showcase_tools:
        info = get_tool_info(tool)
        if info["icon"]:  # Only include tools with valid icons
            results.append({
                "name": tool,
                "icon": info["icon"],
                "color": info["color"]
            })
    return results
