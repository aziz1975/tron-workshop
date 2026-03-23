const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {
  let instance;

  before(async () => {
    instance = await SimpleStorage.deployed();
  });

  it("stores the constructor value from migration", async () => {
    const storedValue = await instance.getValue();

    assert.equal(storedValue.toString(), "42");
  });

  it("updates the stored value", async () => {
    await instance.setValue(99);
    const storedValue = await instance.getValue();

    assert.equal(storedValue.toString(), "99");
  });
});
