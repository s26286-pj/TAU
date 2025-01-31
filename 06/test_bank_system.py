import pytest
from unittest.mock import AsyncMock
from bank_system import Account, Bank, InsufficientFundsError

@pytest.fixture
def sample_account():
    return Account("001", "John Doe", 100.0)

@pytest.fixture
def sample_account_2():
    return Account("002", "Lord Vader", 50.0)

def test_deposit(sample_account):
    """Testowanie poprawności wpłat"""
    sample_account.deposit(50.0)
    assert sample_account.balance == 150.0

def test_withdraw(sample_account):
    """Testowanie wypłat"""
    sample_account.withdraw(50.0)
    assert sample_account.balance == 50.0

def test_withdraw_insufficient_funds(sample_account):
    """Testowanie wypłat gdy saldo jest niewystarczające."""
    with pytest.raises(InsufficientFundsError):
        sample_account.withdraw(200.0)

@pytest.mark.asyncio
async def test_transfer(sample_account, sample_account_2):
    """Testowanie transferów między kontami"""
    auth_mock = AsyncMock()
    await sample_account.transfer(sample_account_2, 50.0, auth_mock)
    assert sample_account.balance == 50.0
    assert sample_account_2.balance == 100.0

def test_create_account():
    """Testowanie tworzenia konta."""
    bank = Bank()
    bank.create_account("123", "John Doe", 100.0)
    assert "123" in bank.accounts
    assert bank.accounts["123"].balance == 100.0

def test_get_account():
    """Testowanie pobierania konta."""
    bank = Bank()
    bank.create_account("123", "John Doe", 100.0)
    account = bank.get_account("123")
    assert account.owner == "John Doe"

def test_get_account_invalid():
    """Testowanie pobierania konta gdy konto nie istnieje"""
    bank = Bank()
    with pytest.raises(ValueError):
        bank.get_account("999")

@pytest.mark.asyncio(loop_scope="function")
async def test_process_transaction():
    """Testowanie procesowania transakcji"""
    bank = Bank()
    bank.create_account("123", "John Doe", 100.0)
    transaction_mock = AsyncMock()
    await bank.process_transaction(transaction_mock)
    transaction_mock.assert_called_once()

@pytest.mark.asyncio(loop_scope="function")
async def test_transfer_insufficient_funds(sample_account, sample_account_2):
    """Testowanie procesowania transakcji gdy saldo jest niewystarczające."""
    auth_mock = AsyncMock()
    with pytest.raises(InsufficientFundsError):
        await sample_account.transfer(sample_account_2, 200.0, auth_mock)
