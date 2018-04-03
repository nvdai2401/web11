$(document).ready(() => {
    listenToFormSubmitEvent()
})

const listenToFormSubmitEvent = () => {
    const formElement = $(".article-search-form");
    formElement.on("submit", async event => {
        event.preventDefault()

        /**
         * TODO:
         *  - Lấy từ khoá search của người dùng
         *  - Lấy data từ server wikipedia tương ứng với từ khoá search 
         *  - Từ data trả về, tạo một array DOM hiển thị các bài viết của wikipedia
         *  - Đưa các DOM trong array trên vào trong <div class="article-list"></div>
         */
        
        $("#article-search-form__input").keyup($.throttle(1000, true , async ()=>{
        // $("#article-search-form__input").keyup(async ()=> {
            //Remove previous loader displayed in previous seacrhing    
            $(".loader").remove();
            //Add a new loader
            $(".article-list").prepend('<div class="loader"></div>');

            //Value of the input form
            const keywordSearching = $("#article-search-form__input").val();
            
            //get data from https://en.wikipedia.org/w/api.php
            const questionQuery = await $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                method: 'POST',//=action
                data: {
                    action: "query",
                    list: "search",
                    format: "json",
                    srprop: "snippet",
                    origin: "*",
                    srsearch: encodeURI(keywordSearching)
                }
            });

            //remove all result when input has no keywordSearching
            if(keywordSearching.length == 0){
                console.log("No question");
                $(".article-list").html("");
            }

            //remove loader before adding elements
            $(".loader").remove();
            //remove elements added in previous seacrhing 
            $(".article-list").html("");

            //add new elements in element has 'article-list' class name
            let resultSearchingList = questionQuery.query.search;
            if(resultSearchingList.length == 0) {
                $(".article-list").prepend("<h2>Không tìm thấy kết quả cho từ khoá: '" + keywordSearching + "'</h2>");
            } else {
                $.each(resultSearchingList, (key, value)=> {
                    $(".article-list").append('<a href="https://en.wikipedia.org/?curid=' + value.pageid+ ' target="_blank" class="article-view"><h3 class="article-view__title">'
                     + value.title + '</h3><p class="article-view__snippet">' + value.snippet + '</p></a>');
                }); 
                
            }           
         }));
    })
}

