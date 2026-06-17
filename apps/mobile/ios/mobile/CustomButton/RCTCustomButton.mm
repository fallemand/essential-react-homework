#import "RCTCustomButton.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/LotteryMobileSpecs/ComponentDescriptors.h>
#import <react/renderer/components/LotteryMobileSpecs/EventEmitters.h>
#import <react/renderer/components/LotteryMobileSpecs/Props.h>
#import <react/renderer/components/LotteryMobileSpecs/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface RCTCustomButton () <RCTCustomButtonViewProtocol>
@end

@implementation RCTCustomButton {
  UIButton *_button;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
  return concreteComponentDescriptorProvider<CustomButtonComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const CustomButtonProps>();
    _props = defaultProps;

    _button = [UIButton buttonWithType:UIButtonTypeSystem];
    _button.translatesAutoresizingMaskIntoConstraints = NO;
    [_button addTarget:self action:@selector(handleButtonPress) forControlEvents:UIControlEventTouchUpInside];

    [self addSubview:_button];

    [NSLayoutConstraint activateConstraints:@[
      [_button.topAnchor constraintEqualToAnchor:self.topAnchor],
      [_button.leadingAnchor constraintEqualToAnchor:self.leadingAnchor],
      [_button.trailingAnchor constraintEqualToAnchor:self.trailingAnchor],
      [_button.bottomAnchor constraintEqualToAnchor:self.bottomAnchor],
    ]];
  }
  return self;
}

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps {
  const auto &oldViewProps = static_cast<const CustomButtonProps &>(*_props);
  const auto &newViewProps = static_cast<const CustomButtonProps &>(*props);

  if (oldViewProps.text != newViewProps.text) {
    [_button setTitle:[NSString stringWithUTF8String:newViewProps.text.c_str()] forState:UIControlStateNormal];
  }

  if (oldViewProps.disabled != newViewProps.disabled) {
    _button.enabled = !newViewProps.disabled;
    _button.alpha = newViewProps.disabled ? 0.5 : 1.0;
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)handleButtonPress {
  const auto &emitter = static_cast<const CustomButtonEventEmitter &>(*_eventEmitter);
  emitter.onCustomButtonPress(CustomButtonEventEmitter::OnCustomButtonPress{});
}

@end

Class<RCTComponentViewProtocol> CustomButtonCls(void) {
  return RCTCustomButton.class;
}
