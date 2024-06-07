import inquirer from 'inquirer';

class Account {
    private balance;

    constructor(initialBalance) {
        this.balance = initialBalance;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount} successfully.`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds.");
        } else {
            this.balance -= amount;
            console.log(`Withdrawn ${amount} successfully.`);
        }
    }

    checkBalance() {
        console.log(`Current balance: ${this.balance}`);
    }
}

async function main() {
    const account = new Account(1000);

    console.log("Welcome to MyBank!");

    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choose an option:',
                choices: [
                    'Deposit',
                    'Withdraw',
                    'Check Balance',
                    'Exit'
                ]
            }
        ]);

        switch (choice) {
            case 'Deposit':
                const { depositAmount } = await inquirer.prompt({
                    type: 'number',
                    name: 'depositAmount',
                    message: 'Enter amount to deposit:',
                    validate: input => input > 0 ? true : 'Please enter a positive number.'
                });
                account.deposit(depositAmount);
                break;
            case 'Withdraw':
                const { withdrawAmount } = await inquirer.prompt({
                    type: 'number',
                    name: 'withdrawAmount',
                    message: 'Enter amount to withdraw:',
                    validate: input => input > 0 ? true : 'Please enter a positive number.'
                });
                account.withdraw(withdrawAmount);
                break;
            case 'Check Balance':
                account.checkBalance();
                break;
            case 'Exit':
                console.log("Thank you for banking with us. Goodbye!");
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

main();
