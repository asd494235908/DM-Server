function email_admin({
    passUrl,
    backUrl,
    passNotShowUrl,
    editUrl,
    delUrl,
    title,
    nickName,
    payType,
    payNum,
    num,
    mobile,
    custom,
    info,
    email,
    time,
    device, pirce_info, oder_id, phone, address, isNum,
    bz }) {
    return `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <title>DcPay个人收款支付系统</title>
    <style type="text/css">
        .ReadMsgBody {
            width: 100%;
            background-color: #ffffff;
        }

        .ExternalClass {
            width: 100%;
            background-color: #ffffff;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }

        html {
            width: 100%;
        }

        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
            margin: 0;
            padding: 0;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            table-layout: fixed;
            margin: 0 auto;
        }

        table table table {
            table-layout: auto;
        }

        img {
            display: block !important;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        a {
            color: #3d8bff;
            text-decoration: none;
        }

        .textbutton a {
            font-size: 16px;
            font-family: 'open sans', arial, sans-serif !important;
            color: #ffffff !important;
        }

        .footer-link a {
            color: #7f8c8d !important;
        }
    </style>
</head>

<body>
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff">

        <!-- header -->

        <tbody><tr>
            <td align="center">
                <table bgcolor="#f7f7f7" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tbody><tr align="center" valign="top">
                        <td>
                            <table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td width="208" align="center" valign="top" bgcolor="#3d8bff">
                                        <table width="158" border="0" align="center" cellpadding="0" cellspacing="0">
                                            <tbody><tr>
                                                <td height="30"></td>
                                            </tr>
                                            <!-- logo -->
                                            <tr>
                                                <td align="center" style="line-height:0px;">
                                                    <img style="display:block;font-size:0px; border:0px; line-height:0px;" src="https://www.dcmaomi.com:3000/serverImage/logoFFF.png" width="130" height="40" alt="logo">
                                                </td>
                                            </tr>
                                            <!-- end logo -->

                                            <tr>
                                                <td height="40"></td>
                                            </tr>

                                            <!-- Compane Name -->
                                            <tr>
                                                <td style="font-family: 'Open Sans', Arial, sans-serif; font-size:16px; color:#ffffff; line-height:26px; font-weight: bold;">
                                                    个人收款支付系统</td>
                                            </tr>
                                            <!-- end Compane Name -->

                                            <tr>
                                                <td height="5"></td>
                                            </tr>

                                            <!-- address -->
                                            <tr>
                                                <td style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff; line-height:26px;">
                                                    免费开源
                                                    <br>
                                                    无需任何第三方SDK
                                                </td>
                                            </tr>
                                            <!-- end address -->

                                            <tr>
                                                <td height="25"></td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                    <td width="392" align="center" valign="top">
                                        <table width="342" border="0" align="center" cellpadding="0" cellspacing="0">
                                            <tbody><tr>
                                                <td height="50"></td>
                                            </tr>

                                            <!-- title -->
                                            <tr>
                                                <td align="right" style="font-family: 'Open Sans', Arial, sans-serif; font-size:38px; color:#3b3b3b; line-height:26px;">
                                                    支付审核通知</td>
                                            </tr>
                                            <!-- end title -->

                                            <tr>
                                                <td height="25"></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <table align="right" width="50" border="0" cellpadding="0" cellspacing="0">
                                                        <tbody><tr>
                                                            <td bgcolor="#3d8bff" height="3" style="line-height:0px; font-size:0px;">&nbsp;</td>
                                                        </tr>
                                                    </tbody></table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="15"></td>
                                            </tr>
                                            <!-- Compane Name -->
                                            <tr>
                                                <td align="right" style="font-family: 'Open Sans', Arial, sans-serif; font-size:16px; color:#3b3b3b; line-height:26px; font-weight: bold;">
                                                    MIKE Presents</td>
                                            </tr>
                                            <!-- end Compane Name -->

                                            <tr>
                                                <td height="5"></td>
                                            </tr>

                                            <!-- address -->
                                            <tr>
                                                <td align="right" style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#7f8c8d; line-height:26px;">
                                                    作者官网：<a href="http://www.dcmaomi.com">http://www.dcmaomi.com</a>
                                                    <br>
                                                    Github：<a href="https://github.com/asd494235908">https://github.com/asd494235908</a>
                                                    <br>
                                                    QQ :
                                                    <span style="color:#3b3b3b"> <strong>494235908</strong>
                                                    </span>
                                                </td>
                                            </tr>
                                            <!-- end address -->

                                            <tr>
                                                <td height="25"></td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>

        <!-- end header -->

        <!-- title -->

        <tr>
            <td align="center">
                <table align="center" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:3px solid #bcbcbc;">
                            <table align="center" width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="20"></td>
                                </tr>

                                <!-- header -->
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="100%" align="left" valign="top" style="font-size:13px; color:#3b3b3b; line-height:26px; text-transform:uppercase;">
                                                    尊敬的管理员Mike您好，您收到了来自${title}订单，请您及时处理：
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <!-- end header -->
                                <tr>
                                    <td height="10"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>

        <!-- end title -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    用户昵称</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${nickName}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    金额</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${num}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    订单编号</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${oder_id}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    选择的套餐</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${pirce_info}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    联系方式</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${phone}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    地址信息</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${address}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    支付方式</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${payType}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    是否为自定义输入金额</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${isNum}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    付款备注</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${bz}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    支付标识号</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${payNum}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    是否为移动端</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${mobile}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    是否自定义金额输入</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${custom}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    留言</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${info}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    通知邮箱</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${email}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->
        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    支付时间</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${time}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- list -->
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" style="border-bottom:1px solid #ecf0f1;">
                            <table width="550" border="0" cellspacing="0" cellpadding="0">
                                <tbody><tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody><tr>
                                                <td width="250" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    用户支付设备信息</td>
                                                <td width="300" align="left" valign="top" style="font-family: 'Open Sans', Arial, sans-serif; font-size:14px; color:#3b3b3b; line-height:26px;  font-weight: bold;">
                                                    <span>${device}</span>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr>
                        <td height="5"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end list -->

        <!-- total -->
        <tr>
            <td align="center">
                <table align="center" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td align="center" height="0" style="border-bottom:3px solid #3b3b3b;"></td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <!-- end total -->

        <!-- note -->
        <tr>
            <td align="center">
                <table align="center" width="600" border="0" cellspacing="0" cellpadding="0">
                    <tbody><tr>
                        <td height="20"></td>
                    </tr>

                    <!-- content -->
                    <tr>
                        <td style="font-size:13px; color:#7f8c8d; line-height:26px;">
                            请确认后点击以下对应按钮进行审核(1天内有效)：
                        </td>
                    </tr>
                    <!-- end content -->
                    <tr>
                        <td height="20"></td>
                    </tr>

                    <tr>
                        <td align="center">
                            <!--button-->
                            <table width="80%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#3d8bff" class="textbutton" style="border-radius:5px;">
                                <tbody><tr>
                                    <td height="40" align="center" style="font-size:16px;color:#FFFFFF;line-height: 28px;padding-left: 15px;padding-right: 15px;">
                                        <a href="${passUrl}" style="display: block;color:#FFFFFF">审核通过</a>
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--end button-->
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>

                    <tr>
                        <td align="center">
                            <!--button-->
                            <table width="80%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#fcd217" class="textbutton" style="border-radius:5px;">
                                <tbody><tr>
                                    <td height="40" align="center" style="font-size:16px;color:#FFFFFF;line-height: 28px;padding-left: 15px;padding-right: 15px;">
                                        <a href="${backUrl}" style="display: block; color:#FFFFFF">驳回</a>
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--end button-->
                        </td>
                    </tr>

                    <tr>
                        <td height="30"></td>
                    </tr>

                    <tr>
                        <td align="center">
                            <!--button-->
                            <table width="80%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#29dfff" class="textbutton" style="border-radius:5px;">
                                <tbody><tr>
                                    <td height="40" align="center" style="font-size:16px;color:#FFFFFF;line-height: 28px;padding-left: 15px;padding-right: 15px;">
                                        <a href="${passNotShowUrl}" style="display: block; color:#FFFFFF">通过但不加入捐赠名单</a>
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--end button-->
                        </td>
                    </tr>
            
        

        <tr>
            <td height="30"></td>
        </tr>

        <tr>
            <td align="center">
                <!--button-->
                <table width="80%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#d9534f" class="textbutton" style="border-radius:5px;">
                    <tbody><tr>
                        <td height="40" align="center" style="font-size:16px;color:#FFFFFF;line-height: 28px;padding-left: 15px;padding-right: 15px;">
                            <a href="${delUrl}" style="display: block; color:#FFFFFF">删除该支付数据</a>
                        </td>
                    </tr>
                </tbody></table>
                <!--end button-->
            </td>
        </tr>
        <tr>
            <td height="15" style="border-bottom:3px solid #bcbcbc;"></td>
        </tr>
    </tbody></table>
    </td>
    </tr>
    <!-- end note -->
    
    
    <!-- footer -->
    <tr>
        <td align="center">
            <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody><tr>
                    <td height="15" align="center" valign="top" style="border-bottom:10px solid #ecf0f1;">
                        <table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                                <td height="25"></td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td width="13" align="center" style="line-height:0px;">
                                                <img style="display:block;font-size:0px; border:0px; line-height:0px;" src="https://i.loli.net/2018/07/18/5b4f3a79dc324.png" width="14" height="11" alt="img">
                                            </td>
                                            <td width="10"></td>
                                            <td class="footer-link" width="120" align="left" style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#3b3b3b; line-height:26px;">
                                                asd494235908@qq.com</td>
                                            <td class="footer-link" width="300" align="right" style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#3b3b3b; line-height:26px;">
                                                <a href="http://www.dcmaomi.com">Mike</a>
                                                <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                                <a href="https://github.com/asd494235908">作者更多开源项目</a>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td height="25"></td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
        </td>
    </tr>
    <!-- end footer -->

    </tbody></table>


</body></html>`
}
function email_user(
    nickName,
    money,
    payType,
    info,
    time,
    asd,
) {
    return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
    
    <head>
        <meta charset="utf-8">
        <title>操作成功</title>
        <meta name="description" content="DcPay个人收款支付系统 无需签约 无需第三方SDK 完全免费">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-weight: bold;
                font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft Yahei STHeiti, sans-serif;
            }
    
            .main {
                margin-top: 40px;
            }
        </style>
    </head>
    
    <body>
        <div class="main">
            <table align="center" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="20"></td>
                </tr>
                <!-- content -->
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        <img style="width: 50px; height: 50px;" src="https://www.dcmaomi.com:3000/serverImage/succ.png" alt="">
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        恭喜您，支付成功！
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        昵称：<span>${nickName}</span>，
                        支付金额：<span>${money}</span>，
                        支付方式：<span>${payType}</span>，
                        留言：<span>${info}</span>，
                        支付时间：<span>${time}</span>
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        ${asd}
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        十分感谢您的捐赠，您还可以到DcPay官网查看到您的捐赠数据：
                        <a href="https://dcpay.dcmaomi.com/donation">https://www.dcmaomi.com</a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        Powered By <a href="https://www.dcmaomi.com">DcPay v1.0</a>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`
}
function meail_err(
    nickName,
    money,
    payType,
    info,
    time) {
    return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
    
    <head>
        <meta charset="utf-8">
        <title>订单支付失败通知</title>
        <meta name="description" content="DcPay个人收款支付系统 无需签约 无需第三方SDK 完全免费">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-weight: bold;
                font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft Yahei STHeiti, sans-serif;
            }
    
            .main {
                margin-top: 40px;
            }
        </style>
    </head>
    
    <body>
        <div class="main">
            <table align="center" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="20"></td>
                </tr>
                <!-- content -->
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        <img style="width: 50px; height: 50px;" src="https://www.dcmaomi.com:3000/serverImage/bei.png" alt="">
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        由于您捐赠不起，或者其他原因未能支付，您的订单支付失败！
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        昵称：<span>${nickName}</span>，
                        支付金额：<span>${money}</span>，
                        支付方式：<span>${payType}</span>，
                        留言：<span>${info}</span>，
                        创建支付时间：<span>${time}</span>
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        未能支付成功的订单将与每日11点发送邮件通知。
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        十分感谢您的体验，捐赠成功可以到DcPay官网查看到您的捐赠数据：
                        <a href="https://www.dcmaomi.com">https://www.dcmaomi.com</a>
                    </td>
                </tr>
                <tr>
                    <td style="font-size:13px; color:#7f8c8d; line-height:26px;" align="center">
                        Powered By <a href="https://www.dcmaomi.com">DcPay v1.0</a>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`
}
module.exports = {
    email_admin,
    email_user,
    meail_err
}