import axios from "axios"
import * as cheerio from "cheerio"

let mainUrl = "https://www.selfstudys.com"

export async function getSubjectsByClass(class_) {
    try {
        const url = `https://www.selfstudys.com/books/cbse-prev-paper/english/class-${class_}th/`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)
        let subjects = $(".firstLi").map((i, el) => {
            return {
                name: $(el).find("a span").text().trim().replace(/^\s*\d+\.\s*|\s*$/g, ""),
                uid:$(el).find("a").prop("href").match(/\/([^\/]+)\/\d+$/)[1],
                id: $(el).prop('id'),
                class: class_
            }
        }).get()
        return subjects
    }
    catch (err) {
        console.error(err)
    }
}

export async function getPYP(class_,uid,id, page) {
    const formatUrl = `${mainUrl}/books/cbse-prev-paper/english/class-${class_}th/${uid}/${id}?page=${page}`
    console.log(formatUrl);
    
    try {
        const { data } = await axios.get(formatUrl);

        const $ = cheerio.load(data);
        const lastHref = $(".pagination a").last().attr("href");
        const maxPage = parseInt(lastHref.match(/page=(\d+)/)[1]) + 1;
        console.log(maxPage)
        const PYPS = $(".chapterLi").map((i, el) => {
            return {
                name: $(el).find(".chapterName").text().trim(),
                class:class_,
                uid:uid,
                paper:$(el).find(".chapterName").text().trim().toLowerCase().replaceAll(/ /g,"-"),
                id:$(el).find("a").prop("href").match(/\/(\d+)$/)?.[1],
            }
        }).get()
   
        return {data:PYPS,maxPage:maxPage}

    } catch (err) {
        console.error(err.message);
    }
}

export async function extractPaper(class_,uid,paper,id) {
    const formatUrl = `${mainUrl}/books/cbse-prev-paper/english/class-${class_}th/${uid}/${paper}/${id}`
    console.log(formatUrl)
    try {
        const { data } = await axios.get(formatUrl)
        const $ = cheerio.load(data)
        const res = $(".PDFFlip").prop("source")
        console.log(res)
        return res
    }
    catch (err) {
        console.log(err.message)
    }
}

