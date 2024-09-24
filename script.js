let potTtitle = "";
let totalAmount = 2000;
let items = [];
const totalDisplay = document.getElementById('total-display');
const titleDisplay = document.getElementById('title-display');
const moneyBar = document.getElementById('money-bar');
const itemList = document.getElementById('item-list');
const totalInput = document.getElementById('total-amount');
const titleInput = document.getElementById('pot-title');
const toggleLabelsCheckbox = document.getElementById('toggle-labels');
const toggleRemainingCheckbox = document.getElementById('toggle-remaining');

// Update the display and bars
const updateDisplay = () => {
    moneyBar.innerHTML = '';

    let totalSpent = items.reduce((sum, item) => sum + item.amount, 0);
    
    titleDisplay.innerText = potTtitle;
    
    totalDisplay.innerText = `Total = £${totalSpent} out of £${totalAmount}`;

    let widthMultiplier = toggleRemainingCheckbox.checked ? 1 : totalAmount / totalSpent;

    items.forEach(item => {
        const potDiv = document.createElement('div');
        const itemWidthPercentage = (item.amount / totalAmount) * 100 * widthMultiplier;

        potDiv.style.width = itemWidthPercentage + '%';
        potDiv.classList.add('money-pot');
        potDiv.style.backgroundColor = item.color;

        const labelDiv = document.createElement('div');
        labelDiv.classList.add('actual-value');
        labelDiv.innerText = `${item.name} (£${item.amount})`;
        
        if (!toggleLabelsCheckbox.checked) {
            labelDiv.style.display = 'none';
        }
        
        potDiv.appendChild(labelDiv);
        moneyBar.appendChild(potDiv);
    });

    const remainingAmount = totalAmount - totalSpent;
    if (remainingAmount > 0 && toggleRemainingCheckbox.checked) {
        const remainingDiv = document.createElement('div');
        const remainingWidthPercentage = (remainingAmount / totalAmount) * 100;
        remainingDiv.style.width = remainingWidthPercentage + '%';
        remainingDiv.classList.add('money-pot', 'remaining');
        
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('actual-value');
        labelDiv.innerText = `Remaining (£${remainingAmount})`;
        
        if (!toggleLabelsCheckbox.checked) {
            labelDiv.style.display = 'none';
        }
        
        remainingDiv.appendChild(labelDiv);
        moneyBar.appendChild(remainingDiv);
    }
};

document.getElementById('add-item').addEventListener('click', () => {
    const itemName = document.getElementById('item-name').value;
    const itemAmount = parseFloat(document.getElementById('item-amount').value);
    const itemColor = document.getElementById('item-color').value;

    if (itemName && !isNaN(itemAmount) && itemAmount > 0) {
        items.push({ name: itemName, amount: itemAmount, color: itemColor });

        const li = document.createElement('li');
        li.innerText = `${itemName} (£${itemAmount})`;
        itemList.appendChild(li);

        document.getElementById('item-name').value = '';
        document.getElementById('item-amount').value = '';
        document.getElementById('item-color').value = '#4CAF50';

        updateDisplay();
    } else {
        alert('Please enter valid item details.');
    }
});

totalInput.addEventListener('change', () => {
    totalAmount = parseFloat(totalInput.value) || 0;
    updateDisplay();
});

titleInput.addEventListener('input', () => {
    potTtitle = titleInput.value;
    updateDisplay();
});

toggleLabelsCheckbox.addEventListener('change', () => {
    updateDisplay();
});

toggleRemainingCheckbox.addEventListener('change', () => {
    updateDisplay();
});

updateDisplay();