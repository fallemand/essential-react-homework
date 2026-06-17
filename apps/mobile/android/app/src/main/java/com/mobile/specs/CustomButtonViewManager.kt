package com.mobile.specs

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.CustomButtonManagerDelegate
import com.facebook.react.viewmanagers.CustomButtonManagerInterface

@ReactModule(name = CustomButtonViewManager.NAME)
class CustomButtonViewManager : SimpleViewManager<CustomButtonView>(), CustomButtonManagerInterface<CustomButtonView> {

    companion object {
        const val NAME = "CustomButton"
    }

    private val delegate = CustomButtonManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<CustomButtonView> = delegate

    override fun getName(): String = NAME

    override fun createViewInstance(context: ThemedReactContext): CustomButtonView {
        return CustomButtonView(context)
    }

    @ReactProp(name = "text")
    override fun setText(view: CustomButtonView, value: String?) {
        view.text = value ?: ""
    }

    @ReactProp(name = "disabled")
    override fun setDisabled(view: CustomButtonView, value: Boolean) {
        view.isEnabled = !value
        view.alpha = if (value) 0.5f else 1.0f
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return mapOf(
            "topCustomButtonPress" to mapOf("registrationName" to "onCustomButtonPress")
        )
    }
}
