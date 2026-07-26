package com.mobile.specs

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.lottery.mobile.NativeNotificationSpec

class NotificationModule(reactContext: ReactApplicationContext) : NativeNotificationSpec(reactContext) {

    companion object {
        const val NAME = NativeNotificationSpec.NAME
        private const val CHANNEL_ID = "default_channel"
        private const val CHANNEL_NAME = "Default"
    }

    override fun getName(): String = NativeNotificationSpec.NAME

    override fun showNotification(title: String, body: String) {
        val context = reactApplicationContext
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT)
            notificationManager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(body)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setAutoCancel(true)
            .build()

        notificationManager.notify(System.currentTimeMillis().toInt(), notification)
    }
}
