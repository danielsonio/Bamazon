# Bamazon

Video demo: https://youtu.be/tl8ZGy-F78s

An Amazon-like storefront utilizing MySQL. The app takes in orders from customers and deplete stock from the store's inventory. 

 * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it lists all items with a inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
  
MySQL and Inquirer npm packages are required.
