What does this submission have?
- Bakery name (currently Mama's Little Bakery)
You can change this and store it as a local variable. Just click on the name and change it however you like, then click the save button that pops up.

- Use API
The page loads using a local array of objects, however you can choose to fetch details from an API instead, if you wish. Just check / uncheck the box.

- Delete local variables
If you wish to delete the local variables (bakery name, number of cookes, cookies per second) this is a quick way to do it. It also sets the related 'setState's to 0, which prevents the 'saveLocalData' from running

- Cookies & Cookies Per Second
Displays the current number of cookies and cookies per second. Both of these are calculated with state hooks. The # of cookies is increased by clicking on the cookie image (manually) or by automatically generating cookies each second (cookies per second).
The number of cookies per second is increased by buying upgrades, which can only be purchased when you have enough cookies to buy them. Each upgrade has a different cost and increases the CPS by a different amount.

- Cookie image
Click on it to add cookies manually. There is a mouseOver & mouseOut function to show some help.

- Upgrades
Upgrades only become available when you have enough cookies to be able to afford the upgrade.
When you buy an upgrade the cost of the upgrade is deducted from the total amount of cookies you have, your CPS increases, and the 'counter' for that particular upgrade increases (x123)
I made it so that it displays a component for each object in the array, however I don't know how to transfer state between components yet, so the counter state for each upgrade is not stored separately for local vs API - if you switch between the two you will notice that the number stays the same (**BUG**)
