module.exports = async (hre) => {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const arguments = [];
  await deploy("Crownfunding", {
    from: deployer,
    args: arguments,
    log: true,
  });
};

module.exports.tags = ['crownfunding'];
