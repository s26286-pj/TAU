import asyncio

from unittest.mock import AsyncMock

class InsufficientFundsError(Exception):
    pass

class ExternalAuthorizationError(Exception):
    pass

class Account:
    def __init__(self, account_number: str, owner: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.owner = owner
        self.balance = initial_balance
    
    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Kwota wpłaty musi być większa od zera.")
        self.balance += amount
        print(f"Wpłacono {amount} PLN na konto {self.account_number}. Nowe saldo: {self.balance} PLN")
    
    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Kwota wypłaty musi być większa od zera.")
        if self.balance < amount:
            raise InsufficientFundsError("Niewystarczające środki na koncie.")
        self.balance -= amount
        print(f"Wypłacono {amount} PLN z konta {self.account_number}. Pozostałe saldo: {self.balance} PLN")
    
    async def transfer(self, to_account: 'Account', amount: float, auth_service: AsyncMock):
        if amount <= 0:
            raise ValueError("Kwota przelewu musi być większa od zera.")
        if self.balance < amount:
            raise InsufficientFundsError("Niewystarczające środki na koncie.")

        # Symulacja asynchronicznej autoryzacji
        authorized = await auth_service()
        if not authorized:
            raise ExternalAuthorizationError("Autoryzacja transakcji nie powiodła się.")

        await asyncio.sleep(1)  # Symulacja czasu trwania przelewu
        self.balance -= amount
        to_account.balance += amount
        print(f"Przelano {amount} PLN z konta {self.account_number} na konto {to_account.account_number}.")

class Bank:
    def __init__(self):
        self.accounts = {}
    
    def create_account(self, account_number: str, owner: str, initial_balance: float = 0.0):
        if account_number in self.accounts:
            raise ValueError("Konto o tym numerze już istnieje.")
        self.accounts[account_number] = Account(account_number, owner, initial_balance)
        print(f"Utworzono konto {account_number} dla {owner} z początkowym saldem {initial_balance} PLN.")
    
    def get_account(self, account_number: str):
        if account_number not in self.accounts:
            raise ValueError("Nie znaleziono konta o podanym numerze.")
        return self.accounts[account_number]
    
    async def process_transaction(self, transaction_func):
        await transaction_func()
        print("Transakcja zakończona.")
