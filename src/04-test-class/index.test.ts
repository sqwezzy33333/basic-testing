import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const cash = 228;
    const bankAccount = getBankAccount(cash);
    expect(bankAccount.getBalance()).toEqual(cash);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const cash = 228;
    const account = getBankAccount(cash);

    expect(() => account.withdraw(cash + 10)).toThrow(
      `Insufficient funds: cannot withdraw more than ${cash}`,
    );
    expect(() => account.withdraw(cash + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const cash = 228;
    const account = getBankAccount(cash);
    const anotherAccount = getBankAccount(59);
    expect(() => account.transfer(cash + 10, anotherAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${cash}`,
    );
    expect(() => account.transfer(cash + 10, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const cash = 228;
    const account = getBankAccount(cash);

    expect(() => account.transfer(cash, account)).toThrow(
      'Transfer failed',
    );
    expect(() => account.transfer(cash, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(228);
    const accountBalance = account.getBalance();
    account.deposit(15);
    const newBalance = account.getBalance();
    expect(newBalance).toEqual(accountBalance + 15);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(45);
    const accountBalance = account.getBalance();
    account.withdraw(15);
    const newBalance = account.getBalance();
    expect(newBalance).toEqual(accountBalance - 15);
  });

  test('should transfer money', () => {
    const account = getBankAccount(55);
    const anotherAccount = getBankAccount(15);

    const balanceOfBankAccount = account.getBalance();
    const balanceOfSameBankAccount = anotherAccount.getBalance();

    account.transfer(15, anotherAccount);

    const newBalanceOfBankAccount = account.getBalance();
    const newBalanceOfSameBankAccount = anotherAccount.getBalance();

    expect(newBalanceOfBankAccount).toEqual(balanceOfBankAccount - 15);
    expect(newBalanceOfSameBankAccount).toEqual(balanceOfSameBankAccount + 15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(35);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(15);

    await expect(account.synchronizeBalance()).resolves.not.toThrow(
      SynchronizationFailedError,
    );
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(45);
    const value = 20;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(value);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(value);
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(35);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    jest.restoreAllMocks();
  });
});
