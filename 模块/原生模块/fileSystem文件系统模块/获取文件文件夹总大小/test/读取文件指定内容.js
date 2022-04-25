var f = require("fs");

///读取文件的指定内容:open-read-close

//1.打开指定的文件
f.open("test.txt", "r+", function(err, fd) {
    if (err) {
        console.log("打开失败，失败原因是", err)
    } else {
        //fd:file description；文件描述符(代表打开的每一个文件)
        console.log("打开成功", fd)
    }

    // 2.定义一个buffer接受内容
    var buf = Buffer.alloc(10)；

    /*
    	f.read(fd,buf,offset,length,position,callback)
    	fd:文件描述符
		buf:接收内容的容器（buffer）
		offset:buffer数据偏移值(0的意思是从buffer的第0个位置开始写入)
		length:读取内容的长度(读取文件8个字符的长度)
		position:要读取目标文件内容的起始位置(从文件中第4个位置开始读取内容)
		callback(err,num,buff):err:返回是否成功
							   num:读取内容的字符个数
							   buff:读取的内容
	*/
    //3.读取指定文件
    f.read(fd, buf, 0, 8, 0, function(err, num, buff) {
        if (err) {
            console.log("读取失败，失败原因是", err)
        } else {
            console.log("读取成功，读取的内容是", buff.toString())
        }
    })
    //4.关闭指定文件
    f.close(fd, function(err) {
        if (err) {
            console.log("关闭失败，失败原因是", err)
        } else {
            console.log("关闭成功")
        }
    })
})