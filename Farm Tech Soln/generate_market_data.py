import json
import matplotlib.pyplot as plt
import random
import os
from datetime import datetime
from collections import Counter
import pandas as pd

# Ensure images directory exists inside the project folder
project_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(project_dir, 'images')
os.makedirs(images_dir, exist_ok=True)

# Simulate loading buyer search/request data
buyer_activity = [
    'Maize', 'Beans', 'Tomatoes', 'Maize', 'Potatoes', 'Maize', 'Beans', 'Tomatoes',
    'Maize', 'Tomatoes', 'Potatoes', 'Beans', 'Maize', 'Tomatoes', 'Beans', 'Maize',
    'Potatoes', 'Tomatoes', 'Maize', 'Beans', 'Tomatoes', 'Maize', 'Potatoes', 'Beans'
]

# Simulate loading farmer sales data (for buyer trends)
farmer_sales = [
    'Maize', 'Maize', 'Beans', 'Tomatoes', 'Potatoes', 'Maize', 'Beans', 'Potatoes',
    'Tomatoes', 'Tomatoes', 'Beans', 'Potatoes', 'Maize', 'Beans', 'Tomatoes', 'Potatoes',
    'Maize', 'Beans', 'Tomatoes', 'Potatoes', 'Maize', 'Beans', 'Tomatoes', 'Potatoes'
]

# 1. Most looked for goods by buyers/markets
product_counts = Counter(buyer_activity)
products = list(product_counts.keys())
counts = list(product_counts.values())
plt.figure(figsize=(6,4))
plt.bar(products, counts, color=['green', 'brown', 'orange', 'gold'])
plt.title('Most Looked For Goods by Buyers/Markets')
plt.xlabel('Product')
plt.ylabel('Number of Searches/Requests')
plt.tight_layout()
plt.savefig(os.path.join(images_dir, 'static_buyer_trends.png'))
plt.close()

# 2. Most sold goods by farmers (trends for buyers)
sales_counts = Counter(farmer_sales)
sales_products = list(sales_counts.keys())
sales_values = list(sales_counts.values())
plt.figure(figsize=(6,4))
plt.bar(sales_products, sales_values, color=['brown', 'green', 'gold', 'orange'])
plt.title('Most Sold Goods by Farmers')
plt.xlabel('Product')
plt.ylabel('Number of Sales')
plt.tight_layout()
plt.savefig(os.path.join(images_dir, 'static_farmer_trends.png'))
plt.close()

# 3. Generate random prices for products in different locations and plot as an image
locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret']
products = ['Maize', 'Beans', 'Tomatoes', 'Potatoes']
price_updates = {}
for loc in locations:
    price_updates[loc] = {prod: random.randint(100, 500) for prod in products}

with open(os.path.join(project_dir, 'price_updates.json'), 'w') as f:
    json.dump(price_updates, f)

# Plot price table as an image
price_df = pd.DataFrame(price_updates).T
fig, ax = plt.subplots(figsize=(7,3))
ax.axis('off')
table = ax.table(cellText=price_df.values,
                 colLabels=price_df.columns,
                 rowLabels=price_df.index,
                 cellLoc='center',
                 loc='center',
                 colColours=['green','brown','orange','gold'])
table.auto_set_font_size(False)
table.set_fontsize(12)
table.scale(1.2, 1.5)
plt.title('Current Market Prices (KES)', fontsize=14, pad=20)
plt.savefig(os.path.join(images_dir, 'market_prices_table.png'), bbox_inches='tight')
plt.close()

print('All charts and price table image generated in images/.')
