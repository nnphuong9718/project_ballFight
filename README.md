# Ball-fight App

## Ứng dụng quản lý đội bóng thực tế, với các chức năng chính như tạo đội bóng, tham gia đội bóng, tìm kiếm đội bóng đối thủ. Ball-fight giúp mọi người dễ dàng tìm kiếm và kết nối với những người cùng đam mê bóng đá.

# Công nghệ sử dụng
- Front-end: React-native
- Back-end: NodeJs, PostgreSQL
- UX/UI: Figma

# Điều kiện tiên quyết để chạy ứng dụng
## Trước khi tiếp tục, hãy đảm bảo bạn đáp ứng đủ các yêu cầu sau đây:
1. Cài đặt môi trường
* Window
* MacOS
2. Thiết bị được kết nối với internet

# Trên Window

# A. Cài đặt môi trường
Trên trang chủ [React Native](https://facebook.github.io/react-native/docs/getting-started) khuyên cài `Node`, `Java SE Development Kit (JDK)` và `Python2` thông qua [Chocolatey](https://chocolatey.org/), đây là ứng dụng phổ biến cho Windows.

Câu lệnh cài đặt trên [Chocolatey](http://https://chocolatey.org/) như sau ( chạy CMD với quyền "Run as Administrator"): `choco install -y nodejs.install python2 jdk8`

Còn nếu bạn không muốn chạy cmd như trên thì bạn vào trang chủ và tải file cài đặt để chạy Chú ý: `version Node 8 hoặc mới hơn; JDK 8 hoặc mới hơn`
1. [Node](https://nodejs.org/en/)
2. [Python2](https://www.python.org/downloads/) tìm Python 2.x để cài nhé
3. [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

# B. The React Native CLI (CLI-command line interface)
Chạy lệnh CMD sau để cài đặt React Native CLI: `npm install -g react-native-cli`
# C. Cài đặt môi trường Android
## 1. Cài Android Studio
Tải Android Studio [tại đây](https://developer.android.com/studio/index.html). Cài đặt và nhớ chọn các mục sau:

* Android SDK
* Android SDK Paltform
* Performance (Intel ® HAXM) -- cho máy ảo
* Android Virtual Device -- cho máy ảo 2 lựa chọn cuối dành cho máy ảo Android. Nếu bạn đã có thiết bị Android rồi thì không cần cài cũng được

## 2. Cài đặt Android SDK

Mặc định Android Studio sẽ cài Android SDK mới nhất nhưng trên trang chủ React Native ưu tiên sử dụng Android 6.0 (Marshmallow) SDK

Đê vào cấu hình cài đặt Android SDK thì ở màn "Welcome to Android Studio" chọn "Configure" và sau đó ấn "SDK Manager"

![](https://i.imgur.com/4ZQtszi.png)

![](https://i.imgur.com/moQPmMK.png)

Nếu bạn đang mở Project nào đó thì ấn "Tools" sau đó "SDK Manager"

![](https://i.imgur.com/V12apUx.png)

Tìm đến Android 6.0 (Marshmallow) chọn các mục dưới đây để tải về:

* Google APIs
* Android SDK Platform 23
* Intel x86 Atom_64 System Image
* Google APIs Intel x86 Atom_64 System Image

![](https://i.imgur.com/3cXltlU.png)

Tiếp, chọn tab "SDK Tools" ấn "Show Package Details", vào "Android SDK Build-Tools" chọn bản `23.0.1`

Chọn "Apply" để bắt đầu tải và cài đặt Android SDK và Build Tools

## 3. Cấu hình ANDROID_HOME cho Windows

Để React Native build app bạn phải chỉ định chỗ bạn cài Android Sdk ở đâu. Bạn làm theo hướng dẫn sau

![](https://i.imgur.com/tqGYYEB.png)

![](https://i.imgur.com/HUL6jM6.png)

![](https://i.imgur.com/zjA1l55.png)

![](https://i.imgur.com/r6rqAy9.png)

Thường thì SDK sẽ được cài ở

`c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`

# D. Chạy  project
## I. Sử dựng thiết bị thật

Việc đầu tiên phải kiểm tra là thiết bị Android của bạn `Wifi` hoạt động tốt vì sắp tới bạn sẽ dùng chủ yếu bằng Wifi

Thứ 2, chọn dây cáp Android thật tốt rồi cắm Android vào máy tính của bạn thôi

## 1. Bật USB debugging

Đầu tiên, thiết bị Android của bạn phải ở chế độ "Developer option". Bạn Vào `Settings → About phone` và click Build number 7 lần.

Sau đó, vào `Settings → Developer options` và chọn "USB debugging"

## 2. Kiểm tra connect với Android

Để chắc chắn rằng Android của bạn đã kết nối với PC, thực ra là ADB mới đúng thì bạn gõ lệnh sau trên CMD `adb devices`

>>adb devices

List of devices attached

emulator-5554 offline   # Google emulator

14ed2fcc device         # Physical device


Hiện dòng tương tự như thế này thì bạn đã thành công `14ed2fcc device`

## 3. Run app
Cài nodemodules bằng lệnh: `npm i `

Gõ lệnh sau trên CMD để cài và chạy app `react-native run-android`

Nếu bạn chạy xong lệnh này mà hiện lỗi sau

![](https://i.imgur.com/BEHa0gV.jpg)

Hiện lỗi đến đây thì bạn đang làm đúng hướng dẫn rồi đấy. Vậy bạn làm các bước tiếp dưới đây

## 4. Kết nối với development server

Đến bước này phải chắc chắn là

* USB debugging đã bật
* Android đã connect với PC
* Android và PC cùng chung 1 mạng nhé

Đầu tiên xem IP của máy PC bạn

1. Đảm bảo Android và PC cùng Wifi network
2. Mở React Native app
3. Nhìn thấy lỗi màn hình đỏ như ở trên. OK tiếp
4. Mở Developer Menu bằng cách lắc lắc Android
5. Đến Dev Settings → Debug server host for device.
6. Điền IP và port của máy PC vào (ví dụ 10.0.1.1:8081)
7. Quay lại Developer menu và ấn Reload
8. Xong!

## II. Sử dụng máy ảo Android
Mở Android studio

![](https://i.imgur.com/I76n7so.png)

Chọn máy ảo bạn muốn và chọn "Create Virtual Device..."

![](https://i.imgur.com/mKsVBPv.png)

Chuyển đến Project `project_ballFight` bạn tạo ra từ đầu để chạy app bằng lệnh sau:

>> cd project_ballFight

>> react-native run-android

Nếu đúng thì sẽ ra kết quả dưới đây

![](https://i.ibb.co/5YP8tgj/intro-app.png)



# Trên MacOs

# A. Cài đặt môi trường
## Node & Watchman

Chúng tôi khuyên bạn nên cài đặt Node và Watchman bằng [Homebrew](https://brew.sh/) . Chạy các lệnh sau trong Terminal sau khi cài đặt Homebrew:

> brew install node

> brew install watchman

Nếu bạn đã cài đặt Node trên hệ thống của mình, hãy đảm bảo rằng đó là Node 8.3 hoặc mới hơn.

[Watchman](https://facebook.github.io/watchman/) là một công cụ của Facebook để xem các thay đổi trong hệ thống tệp. Rất khuyến khích bạn cài đặt nó để có hiệu suất tốt hơn.

Chúng tôi khuyên bạn nên cài đặt JDK bằng Homebrew . Chạy các lệnh sau trong Terminal sau khi cài đặt Homebrew:

>brew tap AdoptOpenJDK/openjdk

>brew cask install adoptopenjdk8
## Sử dụng máy ảo của Android studio

Cài đặt Android studio và máy ảo tương tự như trên windows.

Vào Android studio, chọn SDK manager, và khởi động một máy ảo lên.

Các công cụ React Native yêu cầu một số biến môi trường được thiết lập để xây dựng các ứng dụng với mã gốc.

Thêm các dòng sau vào tập tin $HOME/.bash_profilehoặc $HOME/.bashrccấu hình của bạn :

>export ANDROID_HOME=$HOME/Library/Android/sdk

>export PATH=$PATH:$ANDROID_HOME/emulator

>export PATH=$PATH:$ANDROID_HOME/tools

>export PATH=$PATH:$ANDROID_HOME/tools/bin

>export PATH=$PATH:$ANDROID_HOME/platform-tools

.bash_profilelà cụ thể để bash. Nếu bạn đang sử dụng shell khác, bạn sẽ cần chỉnh sửa tệp cấu hình dành riêng cho shell.

Nhập source $HOME/.bash_profileđể tải cấu hình vào shell hiện tại của bạn. Xác minh rằng ANDROID_HOME đã được thêm vào đường dẫn của bạn bằng cách chạy echo $PATH.

## Xcode & CocoaPods

Cách dễ nhất để cài đặt Xcode là thông qua Mac App Store . Cài đặt Xcode cũng sẽ cài đặt Trình mô phỏng iOS và tất cả các công cụ cần thiết để xây dựng ứng dụng iOS của bạn.

Nếu bạn đã cài đặt Xcode trên hệ thống của mình, hãy đảm bảo rằng đó là phiên bản 9.4 trở lên.

### Công cụ dòng lệnh

Bạn cũng sẽ cần cài đặt Công cụ dòng lệnh Xcode. Mở Xcode, sau đó chọn "Tùy chọn ..." từ menu Xcode. Chuyển đến bảng Vị trí và cài đặt các công cụ bằng cách chọn phiên bản mới nhất trong danh sách thả xuống Công cụ dòng lệnh.

![](https://facebook.github.io/react-native/docs/assets/GettingStartedXcodeCommandLineTools.png)

### Cài đặt Trình mô phỏng iOS trong Xcode

Để cài đặt trình giả lập, hãy mở Xcode> Tùy chọn ... và chọn tab Thành phần . Chọn một trình giả lập với phiên bản iOS tương ứng bạn muốn sử dụng.

### CocoaPods

[CocoaPods](https://cocoapods.org/) được xây dựng với Ruby và nó sẽ có thể cài đặt được với Ruby mặc định có sẵn trên macOS. Bạn có thể sử dụng trình quản lý Phiên bản Ruby, tuy nhiên chúng tôi khuyên bạn nên sử dụng Ruby tiêu chuẩn có sẵn trên macOS trừ khi bạn biết bạn đang làm gì.

# B. Chạy project

Cài nodemodules bằng lệnh: `npm i`

Chạy npx react-native run-ios trong thư mục dự án `project_ballFight` của bạn.

>cd project_ballFight

>npx react-native run-ios

Nếu chạy thành công thì sẽ ra kết quả dưới đây

![](https://i.ibb.co/5YP8tgj/intro-app.png)

Nhấn ⌘R vào Trình mô phỏng iOS của bạn để tải lại ứng dụng và xem các thay đổi của bạn!



# That's it!











