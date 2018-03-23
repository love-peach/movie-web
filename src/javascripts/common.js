$(document).ready(function () {

    /**
     * 退出登录
     * */
    var $logOut = $('#logOut');
    $logOut.on('click', function () {
        $.ajax({
            type: 'post',
            url: '/user/logout',
            headers: {
                'Accept': "application/xxx",
                'Content-Type': "application/json; charset=utf-8",
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                if (res.success === 1) {
                    location.href = '/';
                }
            }
        });
    });

    /*==================== 搜索相关事件 begin ====================*/

    var $searchInput = $('#searchInput');
    var $iconSearchBtn = $('#iconSearchBtn');
    var $searchSuggestWrap = $('.search-suggest-wrap');
    var searchIndex = -1;

    // 监听搜索按钮点击事件
    $iconSearchBtn.on('click', function () {
        var inputValue = $searchInput.val().trim();
        if(inputValue) {
            location.href = "/search?q=" + inputValue;
        }
    });

    // 监听键盘事件
    $(document).keyup(function (e) {
        // 如果是输入框元素
        if (e.target.id === 'searchInput') {
            // 回车
            if (e.keyCode == 13) {
                if (e.target.value) {
                    location.href = "/search?q=" + e.target.value;
                }
            }

            var suggestItems = $searchSuggestWrap.find('.suggest-item');

            // 上
            if (event.keyCode == 38) {
                (searchIndex > 0) ? searchIndex -= 1 : searchIndex = suggestItems.length - 1
                $searchInput.val(suggestItems.eq(searchIndex).find('.info-name').text());
                suggestItems.removeClass('active');
                suggestItems.eq(searchIndex).addClass('active');
            }
            // 下
            if (event.keyCode == 40) {
                (searchIndex < suggestItems.length - 1) ? searchIndex += 1 : searchIndex = 0;
                $searchInput.val(suggestItems.eq(searchIndex).find('.info-name').text());
                suggestItems.removeClass('active');
                suggestItems.eq(searchIndex).addClass('active');
            }
        }
    });

    // TODO 动态生成的 dom 在添加点击事件时 需要委托 参考：http://www.jianshu.com/p/847568e6149e
    $('.search').on('mouseenter', '.search-suggest-wrap .suggest-item', function (e) {
        var currentEle = this;
        var suggestItems = $searchSuggestWrap.find('.suggest-item');
        suggestItems.removeClass('active').each(function (index, item) {
            if (item == currentEle) {
                searchIndex = index;
            }
        });
        $(this).addClass('active');
    });

    // 输入框聚焦事件
    $searchInput.on('focus', function () {
        console.log('focus');
    });

    // 输入框输入事件
    var debounceSearch = false; // 设置防抖变量
    $searchInput.on('input', function (e) {
        var inputValue = e.target.value.trim();
        clearTimeout(debounceSearch); // 清除待执行代码
        debounceSearch = setTimeout(function(){
            inputTypingEvent(inputValue);
        }, 300);
    });

    // 输入框失焦事件
    $searchInput.on('blur', function () {
        setTimeout(function () {
            $searchSuggestWrap.hide();
        }, 300);
    });

    // 定义输入框输入事件，执行的方法
    function inputTypingEvent(inputValue) {
        searchIndex = -1;
        var url = "/searchSuggest?q=" + inputValue;
        if(inputValue) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: "json",
                success: function (suggestData) {
                    $searchSuggestWrap.show().html(renderSearchSuggest(suggestData));
                }
            });
        } else {
            $searchSuggestWrap.hide();
        }
    }

    // 渲染搜索建议词条
    function renderSearchSuggest(suggestData) {
        var fragment = document.createDocumentFragment();
        suggestData.forEach(function (item) {
            var suggestItem = document.createElement("li");
            var suggestItemLink = document.createElement("a");
            var suggestItemImg = document.createElement("img");
            var infoWrap = document.createElement("p");
            var infoName = document.createElement("em");
            var infoYear = document.createElement("span");
            var infoSubName = document.createElement("span");

            infoSubName.className = 'info-sub-name text-ellipsis';
            infoYear.className = 'info-year';
            infoName.className = 'info-name';
            infoWrap.className = 'link-info';
            suggestItemImg.className = 'link-img';
            suggestItemLink.className = 'suggest-item-link';
            suggestItem.className = 'suggest-item';

            infoSubName.innerHTML = item.sub_title;
            infoYear.innerHTML = item.year ? '(' + item.year + ')' : '';
            infoName.innerHTML = item.title;
            infoWrap.appendChild(infoName);
            infoWrap.appendChild(infoYear);
            infoWrap.appendChild(infoSubName);
            suggestItemImg.src = item.img;
            suggestItemLink.href = '/movie/detail/' + item.id;
            suggestItemLink.appendChild(suggestItemImg);
            suggestItemLink.appendChild(infoWrap);
            suggestItem.appendChild(suggestItemLink);
            fragment.appendChild(suggestItem);
        });
        return fragment;
    }

    /*==================== 搜索相关事件 end ====================*/

});
