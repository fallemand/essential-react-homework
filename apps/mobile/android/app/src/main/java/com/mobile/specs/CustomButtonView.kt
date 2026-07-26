package com.mobile.specs

import android.content.Context
import android.widget.Button
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

class CustomButtonView(context: Context) : Button(context) {

    init {
        setOnClickListener {
            val reactContext = context as ReactContext
            val dispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
            dispatcher?.dispatchEvent(CustomButtonPressEvent(UIManagerHelper.getSurfaceId(this), id))
        }
    }

    private class CustomButtonPressEvent(surfaceId: Int, viewId: Int) : Event<CustomButtonPressEvent>(surfaceId, viewId) {
        override fun getEventName(): String = "topCustomButtonPress"
        override fun getEventData() = WritableNativeMap()
    }
}
