import { Configuration, Inject, PlatformApplication } from "@tsed/common";

// async function bootstrap() {
//   try {
//     const platform = await PlatformExpress.bootstrap(Server);
//     await platform.listen();

//     process.on("SIGINT", () => {
//       platform.stop();
//     });
//   } catch (error) {
//     $log.error({
//       event: "SERVER_BOOTSTRAP_ERROR",
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// }
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}

// bootstrap();
