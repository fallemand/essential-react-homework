#import "RCTNativeNotification.h"
#import <UserNotifications/UserNotifications.h>
#import <React/RCTLog.h>
#import <LotteryMobileSpecsJSI.h>

@implementation RCTNativeNotification

RCT_EXPORT_MODULE(NativeNotification)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeNotificationSpecJSI>(params);
}

- (void)showNotification:(NSString *)title body:(NSString *)body {
  UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
  content.title = title;
  content.body = body;
  content.sound = [UNNotificationSound defaultSound];

  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:[[NSUUID UUID] UUIDString]
                                                                        content:content
                                                                        trigger:nil];

  [[UNUserNotificationCenter currentNotificationCenter] addNotificationRequest:request
                                                         withCompletionHandler:^(NSError *error) {
    if (error) {
      RCTLogError(@"Failed to show notification: %@", error.localizedDescription);
    }
  }];
}

@end
