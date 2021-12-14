process.env["NODE_CONFIG_DIR"] = __dirname + "/configs";

import "dotenv/config";
import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import TokensRoute from "@routes/tokens.route";
import HumansRoute from "@routes/humans.route";
import AuctionsRoute from "@routes/auctions.route";
import validateEnv from "@utils/validateEnv";

// validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new TokensRoute(),
  new HumansRoute(),
  new AuctionsRoute(),
]);

app.listen();
