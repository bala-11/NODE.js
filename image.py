import matplotlib.pyplot as plt
import networkx as nx

# Create a directed graph
G = nx.DiGraph()

# Define the nodes
nodes = [
    "User Interaction Layer (Web, Mobile, Social Media)",
    "Kore.ai Platform (NLP Engine, Dialog Management, Persona Management, Bot Configuration)",
    "External Systems Integration (APIs, CRM, ERP)",
    "Backend Systems (CRM, ERP, etc.)",
    "Data Storage (Database)",
    "AI & ML Layer (Training, Analytics, Insights)",
    "Admin & Monitoring Layer (Analytics, Logs, Error Management)"
]

# Add nodes to the graph
G.add_nodes_from(nodes)

# Define the edges (arrows)
edges = [
    ("User Interaction Layer (Web, Mobile, Social Media)", "Kore.ai Platform (NLP Engine, Dialog Management, Persona Management, Bot Configuration)"),
    ("Kore.ai Platform (NLP Engine, Dialog Management, Persona Management, Bot Configuration)", "External Systems Integration (APIs, CRM, ERP)"),
    ("External Systems Integration (APIs, CRM, ERP)", "Backend Systems (CRM, ERP, etc.)"),
    ("Backend Systems (CRM, ERP, etc.)", "Data Storage (Database)"),
    ("Data Storage (Database)", "AI & ML Layer (Training, Analytics, Insights)"),
    ("AI & ML Layer (Training, Analytics, Insights)", "Admin & Monitoring Layer (Analytics, Logs, Error Management)")
]

# Add edges to the graph
G.add_edges_from(edges)

# Set the positions for the nodes
pos = {
    nodes[0]: (0, 0),
    nodes[1]: (0, -2),
    nodes[2]: (2, -4),
    nodes[3]: (2, -6),
    nodes[4]: (4, -8),
    nodes[5]: (6, -10),
    nodes[6]: (8, -12)
}

# Draw the graph
plt.figure(figsize=(10, 12))
nx.draw(G, pos, with_labels=True, node_size=3000, node_color='lightblue', font_size=10, font_weight='bold', arrows=True, edge_color='gray')

# Title
plt.title("Kore.ai Bot Communication Architecture", fontsize=14)

# Show the plot
plt.tight_layout()
plt.show()
