import { Configuration, Inject, PlatformApplication } from "@tsed/common";

export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
