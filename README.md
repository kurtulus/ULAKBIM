Squid-Pacific  
=============  
  
ePub3 Editör  
  
####V: 0.1  
  
###Purpose  
Online multi-user epub3 editor aplication.  
  
See INSTRUCTIONS for Installation.  
See WHATSNEW for New Features.  
  
Apache2 Installation  
-----------------------------------------------------------------  
apt-get install apache2  
apt-get install libapache2-mod-php5  
apt-get install libapache2-mod-xsendfile  
a2enmod ssl  
a2enmod rewrite  
a2enmod xsendfile  
a2enmod headers  
  
Php5 Installation  
-----------------------------------------------------------------  
apt-get install php5-common  
apt-get install php5-curl  
apt-get install php5-gd  
apt-get install php5-json  
apt-get install php5-mysql  
apt-get install php5-mcrypt   
  
Git Installation  
-----------------------------------------------------------------  
apt-get install git-core  
  
mysql 5.5.34 Installation  
-----------------------------------------------------------------  
apt-get install mysql-server mysql-client  
  
  
imagemagick Installation  
-----------------------------------------------------------------  
apt-get install imagemagick  
  
  
poppler-utils Installation  
-----------------------------------------------------------------  
apt-get install poppler-utils  
  
  
libpodofo-utils Installation  
-----------------------------------------------------------------  
apt-get install libpodofo-utils  
  
  
pdftk Installation  
-----------------------------------------------------------------  
apt-get install pdftk  
  
  
zip, unzip Installation  
-----------------------------------------------------------------  
apt-get install zip unzip  
  
  
ghost script Installation  
-----------------------------------------------------------------  
apt-get install ghostscript  
  
  
curl Installation  
-----------------------------------------------------------------  
apt-get install curl  
  
  
wkhtmltopdf Installation  
-----------------------------------------------------------------  
Eski olanı(xvfb ile kullanılır)->apt-get install wkhtmltopdf  
Yeni olanı(xvfb gerektirmez)->http://wkhtmltopdf.org/downloads.html .deb indir ve dpkg -i <package_name.deb>  
touch /var/log/epubtopdf; chmod 777 /var/log/epubtopdf  
  
pdf2htmlex  
-----------------------------------------------------------------  
add-apt-repository ppa:coolwanglu/pdf2htmlex  
apt-get update  
apt-get install pdf2htmlex  
  
xvfb  
-----------------------------------------------------------------  
apt-get install xvfb  
  
pdfcrop  
-----------------------------------------------------------------  
apt-get install texlive-extra-utils  
  
Co-Working  
-----------------------------------------------------------------  
apt-get install nodejs npm  
npm config set registry http://registry.npmjs.org/  
npm install -g socket.io  
  
Locale(for turkish)  
-----------------------------------------------------------------  
less /usr/share/i18n/SUPPORTED (desteklenen locallere bak)  
locale-gen tr_TR.UTF-8  

Lepub mime type for client computer
-----------------------------------------------------------------  
<?xml version="1.0" encoding="UTF-8"?>
<mime-info xmlns="http://www.freedesktop.org/standards/shared-mime-info">
  <mime-type type="application/lepub">
    <sub-class-of type="application/zip"/>
    <comment>Linden EPUB format prepared for TUBITAK/ULAKBIM</comment>
    <glob pattern="*.lepub"/>
  </mime-type>
</mime-info>


nano /usr/share/mime/packages/lepub.xml

update-mime-database /usr/share/mime


  
  
