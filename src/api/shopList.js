import http from "@/libs/axios";



export function getShopList(query) {
  return http({
    url: "/marked/marked/",
    method: "get",
    params: query
  })
}
export function getOneShopList(id) {
  return http({
    url: `//${id}`,
    method: "get",
  })
}

export function createShopList(data) {
  return http({
    url: "/marked/marked/",
    method: "post",
    data
  })
}

export function editShopList(data) {
  return http({
    url: "/",
    method: "patch",
    data
  })
}

export function deleteShopList(query) {
  return http({
    url: "/",
    method: "delete",
    params: query,
  })
}


export function getShopList2(query) {
  return http({
    url: "/shoplist/",
    method: "get",
    params: query
  })
}